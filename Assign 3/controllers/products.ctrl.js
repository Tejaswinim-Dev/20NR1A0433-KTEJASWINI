const products = [{
    id: 1,
    name: "APPLE iPhone 15 Pro (Blue Titanium, 128 GB)",
    imgSrc: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/z/4/r/-original-imagtc4g22rcatjg.jpeg?q=70",
    price: "1,34,900",
    specifications: [
        "128 GB ROM",
        "15.49 cm (6.1 inch) Super Retina XDR Display",
        "48MP + 12MP + 12MP | 12MP Front Camera",
        "48MP + 12MP + 12MP | 12MP Front Camera"
    ]
}, {
    id: 2,
    name: "APPLE iPhone 15 (Blue, 128 GB)",
    imgSrc: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg?q=70",
    price: "79,900",
    specifications: [
        "128 GB ROM",
        "15.49 cm (6.1 inch) Super Retina XDR Display",
        "48MP + 12MP + 12MP | 12MP Front Camera",
        "48MP + 12MP + 12MP | 12MP Front Camera"
    ]
}, {
    id: 3,
    name: "APPLE iPhone 15 (Blue Titanium, 128 GB)",
    imgSrc: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/z/4/r/-original-imagtc4g22rcatjg.jpeg?q=70",
    price: "79,900",
    specifications: [
        "128 GB ROM",
        "15.49 cm (6.1 inch) Super Retina XDR Display",
        "48MP + 12MP + 12MP | 12MP Front Camera",
        "48MP + 12MP + 12MP | 12MP Front Camera"
    ]
}]

const productCtrl = {
    getAll: (req, res) => {
        res.status(200)
        res.send({ data: products })
    },
    getById: (req, res) => {
        const filteredProduct = products.find(product => product.id === +req.params.productId)
        if (filteredProduct) {
            res.status(200)
            res.send({
                data: filteredProduct
            })
        } else {
            res.status(404)
            res.send({
                error: "Product Not Found",
                errorDiscription: "No Product Found with the given Id inthe database"
            })
        }
    },
    add: (req, res) => {
        const filteredProduct = products.find(product => product.name === +req.body.name)
        if (filteredProduct) {
            res.status(400)
            res.send({
                error: "Product already exist",
                errorDescription: `A product with the name ${req.body.name} is already available`
            })
        } else {
            const createdProduct = {
                id: products.length + 1,
                ...req.body
            }
            products.push(createdProduct)
            res.status(201)
            res.send({
                data: createdProduct
            })
        }
    },
    update: (req, res) => {
        const index = products.findIndex(product => product.id === +req.params.productId)
        if (index !== -1) {
            ["imgSrc", "price", "specifications"].forEach(parameterName => {
                products[index][parameterName] = req.body[parameterName]
            })
            res.status(200)
            res.send({
                status: "updated Successfully",
                data: products[index]
            })
        } else {
            res.status(400)
            res.send({
                error: "product not found",
                errorDiscription : "product doesn't exist with the name provided"
            })
        }
    },
    delete: (req,res) => {
        const index = products.findIndex(product => product.id === +req.params.productId)
        if(index !== -1){
            products.splice(index,1)
            res.status(200)
            res.send({
                status:"Deleted successfully"
            })
        }else{
            res.status(400)
            res.send({
                error: "product not found",
                errorDiscription : "product doesn't exist with the name provided"
            })
        }
    }
}

module.exports = productCtrl