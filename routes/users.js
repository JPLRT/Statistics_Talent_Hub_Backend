const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users
// @desc    Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().lean();
       res.json(users);
    } catch (err) {
        console.error('GET /api/users - Error:', err.message);
       res.status(500).send('Server error');
   }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        console.log('GET /api/users/:id - User data from DB:', user);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('GET /api/users/:id - Error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT /api/users/:id
// @desc     Update user data
router.put('/:id', async (req, res) => {
    const { profile } = req.body;
   try {
       let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
       user = await User.findByIdAndUpdate(req.params.id, { $set: { profile } }, { new: true });
      res.json(user);
    } catch (err) {
       console.error('PUT /api/users/:id - Error:', err.message);
      res.status(500).send('Server error');
   }
});

// @route    POST /api/users
// @desc     Create new user
router.post('/', async (req, res) => {
   const { name, email, year_of_graduation, qualification, current_job_role, current_working_organization, current_field_of_work, current_location, working_experience_years, isActive, isAdmin } = req.body;
    try {
        const newUser = new User({
           name,
           email,
            year_of_graduation,
             qualification,
            current_job_role,
           current_working_organization,
           current_field_of_work,
            current_location,
           working_experience_years,
           isActive,
           isAdmin
       });
       const user = await newUser.save();
      res.json(user);
   } catch (err) {
        console.error('POST /api/users - Error:', err.message);
       res.status(500).send('Server error');
    }
});

// @route   PUT /api/users/:id/approve
// @desc    Approve a user by ID (admin)
router.put('/:id/approve', async (req, res) => {
    try {
       let user = await User.findById(req.params.id);
       if (!user) {
            return res.status(404).json({ msg: 'User not found' });
       }
      user = await User.findByIdAndUpdate(req.params.id, { $set: { isActive: true } }, { new: true });
      res.json(user);
   } catch (err) {
       console.error('PUT /api/users/:id/approve - Error:', err.message);
       res.status(500).send('Server error');
    }
});

module.exports = router;