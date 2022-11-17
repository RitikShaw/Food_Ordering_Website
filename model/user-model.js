const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

userSchema.methods.generatehash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
};

userSchema.methods.comparehash= function(password,hashpassword){
    return bcrypt.compareSync(password,hashpassword);
};

module.exports = mongoose.model('users', userSchema);