const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {
        type: "String"
    },
    price: {
        type: "Number"
    },
    imgSrc: {
        type: "String"
    },
    specifications: [{
        type: "String"
    }],
    inStock: {
        type: "Boolean",
    }

}, { timestamps: true })

const productsModel = mongoose.model('products', productsSchema)

module.exports = productsModel 