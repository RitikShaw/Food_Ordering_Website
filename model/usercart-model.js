const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        default: ""
    },
    products: {
        type: Object,
        required: true,
        default: "",
    },
    
    isdeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
});

module.exports = mongoose.model('carts', cartSchema);