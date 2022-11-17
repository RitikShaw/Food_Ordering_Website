const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        default: ""
    },
    product_id: {
        type: String,
        required: true,
        default: "",
        items: {
            type: String,
            required: true,
            default: ""
        },
    },
    
    isdeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
});

module.exports = mongoose.model('menus', cartSchema);