const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var foodSchema = new Schema({
    rating: {
        type: String,
        required: true,
        default: ""
    },
    name: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        default: ""
    },
    food_img: {
        type: String,
        default: ""
    },
    isdeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
});

module.exports = mongoose.model('menus', foodSchema);