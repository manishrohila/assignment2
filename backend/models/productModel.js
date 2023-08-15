const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0
    },
    noOfReviews:{
        type: Number
    },
    mediaCount: {
        type: Number,
        default: 7
    }
    
})

module.exports = mongoose.model("product", productSchema);