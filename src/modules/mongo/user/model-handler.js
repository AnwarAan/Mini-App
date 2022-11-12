import joi from "joi";

const getUserIdSchema = joi.string().min(24).max(24);

const registerUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().min(6).max(16).required(),
  phoneNumber: joi
    .string()
    .min(9)
    .max(14)
    .regex(/^[0-9'.]+$/)
    .required(),
  photo: joi.string(),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(6).max(16).required(),
});

const updateUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().min(6).max(16).required(),
  phoneNumber: joi
    .string()
    .min(9)
    .max(14)
    .regex(/^[0-9'.]+$/)
    .required(),
  photo: joi.string(),
});

const schema = {
  getUserIdSchema,
  registerUserSchema,
  loginSchema,
  updateUserSchema,
};

export default schema;
