const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true },
year_of_graduation: { type: String },
qualification: { type: String },
current_job_role: { type: String },
current_working_organization: { type: String },
current_field_of_work: { type: String },
current_location: { type: String },
isMentor: { type: Boolean, default: false },
working_experience_years: { type: Number },
isActive: { type: Boolean, default: false },
isAdmin: { type: Boolean, default: false },
profile: { type: Object, default: { profilePic: "" } }
}, {
timestamps: true
});
UserSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);

