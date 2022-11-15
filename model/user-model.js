const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String
    },
    profile_image: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true,
        enum: [true, false]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);