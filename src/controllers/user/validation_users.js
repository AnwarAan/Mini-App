import joi from "joi";

const getUserByIdSchema = joi.string().min(24).max(24).required();

const getUserByEmail = joi.string().email({
    minDomainSegments: 2,
    tlds: {
        allow: ['com', 'net']
    }
});

const registerUserSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(3).max(50).email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }).required(),
    password: joi.string().min(6).max(16).required(),
    address: joi.string().min(3).max(100).required(),
    age: joi.number().integer().min(1).max(100).required()
});

const deleteUserSchema = joi.string().min(24).max(24).required()

const schema = {
    getUserByIdSchema,
    getUserByEmail,
    registerUserSchema,
    deleteUserSchema
}
export default schema;