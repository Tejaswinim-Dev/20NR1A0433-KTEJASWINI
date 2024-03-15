const productModel = require("../models/products.model")

const productService = {
    getAllProducts: () => {
        return productModel.find()
    },
    getById: (id) => {
        return productModel.findById(id)
    },
    getByName: (name) => {
        return productModel.find({ name })
    },
    add: (data) => {
        const productToAdd = new productModel(data)
       return productToAdd.save()
    },
    update: (id,data)=>{
       return productModel.findByIdAndUpdate(id,data,{new:true})
    },
    patch:(id,data)=>{
       return productModel.findByIdAndUpdate(id,({$set:{...data}}),({new:true}))
    },
    delete:(id)=>{
      return  productModel.findByIdAndDelete(id)
    },
    getCount:()=>{
       return productModel.countDocuments()
    },
    pagination:(index,pageCount)=>{
       return productModel.find()
        .skip(index * pageCount)
        .limit(pageCount)
    }
}
module.exports = productService