import joi from "joi";

const checkIdSchema = joi.string().min(24).max(24).required();

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

const loginUserSchema = joi.object({
    email: joi.string().min(3).max(50).email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }).required(),
    password: joi.string().min(6).max(16).required()
})

const updateUserSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(3).max(50).email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }).forbidden(),
    password: joi.string().min(6).max(16).forbidden(),
    address: joi.string().min(3).max(100).required(),
    age: joi.number().integer().min(1).max(100).required()
})

const schema = {
    checkIdSchema,
    registerUserSchema,
    loginUserSchema,
    updateUserSchema
}
export default schema;