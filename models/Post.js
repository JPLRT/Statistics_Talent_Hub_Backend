const mongoose = require('mongoose');

 const PostSchema = new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 text: { type: String, required: true },
 imageUrl: { type: String }, // Optional image path
 createdAt: { type: Date, default: Date.now },
 });

 module.exports = mongoose.model('Post', PostSchema);