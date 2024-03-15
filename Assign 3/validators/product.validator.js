const Joi = require("joi")

const productValidator = async (req,res,next) => {
    try{
        const productSchema = Joi.object({
            name : Joi.string()
                    .min(5)
                    .required(),
            price : Joi.number()
                    .min(100)
                    .required(),
            specifications: Joi.array()
                    .items(Joi.string())
                    .required(),
            imgSrc : Joi.string()
                    .required(),
            inStock: Joi.boolean()
                    .required()
        })
        await productSchema.validateAsync(req.body)
        next();
    }catch(error){
        const errorMessages = []
        if(error.details){
            error.details.forEach(obj => {
                errorMessages.push(obj.message)
            })
            res.status(400);
            res.send({
                error: errorMessages
            })
        }else{
            res.status(500)
            res.send(error)
        }
    }
}

module.exports = productValidator