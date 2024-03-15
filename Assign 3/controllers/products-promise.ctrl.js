const productModel = require("../models/products.model")
const productService = require("../services/product.svc")
const products = []

const productCtrl = {
    getAll: async (req, res) => {
        console.log(req.protocol + "://" + req.headers.host + "/")
        try {
            const products = await productService.getAllProducts();
            products.forEach(product => {
                product.imgSrc = req.protocol + "://" + req.headers.host + "/" + product.imgSrc
            })
            res.status(200)
            res.send({ data: products })
        } catch (error) {
            res.status(500);
            res.send({
                error: "There was a problem with the server",
                description: error
            })
        }
    },

    getById: async (req, res) => {
        try {
            const product = await productService.getById(req.params.productId)
            product.imgSrc = req.protocol + "://" + req.headers.host + "/" + product.imgSrc
            res.status(200)
            res.send({ data: product })
        } catch
        (error) {
            console.log(error)
            res.status(500);
            res.send({
                error: "There was a problem with the server",
                description: error
            })
        }
    },
    add: (req, res) => {
        productModel.findOne({ name: req.body.name }).then(product => {
            if (product) {
                res.status(409)
                res.send({
                    error: 'Product already exists',
                    errorDiscription: "the product already exist with the id provided in the request"
                })
            } else {
                const productToAdd = new productModel(req.body)
                productToAdd.save().then(addedProduct => {
                    res.status(201)
                    res.send({
                        data: addedProduct,
                    })
                }).catch(error => {
                    res.status(500)
                    res.send({
                        error: "Server_error",
                        errorDiscription: error
                    })
                })
            }
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send({ error: 'server_error', description: error });
        })
    },
    update: (req, res) => {
        productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true }).then(updatedProduct => {
            res.status(200),
                res.send({
                    data: updatedProduct
                })
        }).catch(error => {
            res.status(500),
                res.send({
                    error: "server_error",
                    errorDescription: error
                })
        })
    },
    patch: (req, res) => {
        productModel.findByIdAndUpdate(req.params.productId, { $set: { ...req.body } }, { new: true }).then(updatedProduct => {
            res.status(200);
            res.send({
                data: updatedProduct
            })
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send({ error: 'server_error', description: error });
        })
    },
    delete: async (req, res) => {
        try {
            const product = await productService.delete(req.params.productId)
            res.status(200)
            res.send({
                status: "Deleted successfully",
                data: product
            })
        } catch {
            console.log(error)
            res.status(500)
            res.send({
                error: "product not found",
                errorDiscription: error
            })
        }
    },
    getByPagination: async (req, res) => {
        try {
            const pageCount = +req.query.pageCount
            const index = +req.query.pageNo
            const count = await productService.getCount()
            const totalPages = Math.ceil(count / pageCount)
            const filteredProducts = await productService.pagination(index, pageCount)
            const metadata = {
                isPrevious: index > 0,
                isNext: (index + 1) !== totalPages,
                count: count
            }
            res.status(200)
            res.send({ metadata, products: filteredProducts })
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ error: 'server_error', description: error });
        }
    }
}

module.exports = productCtrl