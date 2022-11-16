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
    profile_img: {
        type: String,
        default: ""
    },
    isdeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('users', userSchema);