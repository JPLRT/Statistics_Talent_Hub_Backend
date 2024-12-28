    const express = require('express');
    const router = express.Router();
    const User = require('../models/User');

    // @route   POST /api/auth/login
    // @desc    Login user (check if email is registered and active)
    router.post('/login', async (req, res) => {
        let { email } = req.body;
         email = email.toLowerCase().trim();
        try {
            const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }); // changed from email_ID to email
            if (!user) {
                return res.status(400).json({ msg: 'User not registered' });
            }
            if (!user.isActive) {
                return res.status(403).json({ msg: 'User not approved yet' });
            }

            res.json({ msg: 'Login successful', userId: user._id });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    module.exports = router;