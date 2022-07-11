import joi from "joi";


const getProductSchema = joi.string().min(24).max(24).required();

const getProductByNameSchema = joi.string().min(1).max(100).required();

const addProductSchema = joi.object({
    name: joi.string().min(1).max(20).required(),
    price: joi.number().integer().min(1).required(),
    rating: joi.number().integer().min(1).max(10).required(),
    tag: joi.string().min(3).max(10).required()
});

const updateProductSchema = joi.object({
    name: joi.string().min(1).max(20).required(),
    price: joi.number().integer().min(1).required(),
    rating: joi.number().integer().min(1).max(10).required(),
    tag: joi.string().min(3).max(10).required()
})

const deleteProductSchema = joi.string().min(24).max(24).required();

const schema = {
    getProductSchema,
    getProductByNameSchema,
    addProductSchema,
    updateProductSchema,
    deleteProductSchema
}


export default schema;