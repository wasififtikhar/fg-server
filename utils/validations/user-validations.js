const Joi = require("joi");

const registerValidation = Joi.object().keys({
    user_name: Joi.string(),
    email: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "Email is required" }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({ "any.required": "Password is required" }),
});

const loginValidation = Joi.object().keys({
    email: Joi.string()
        .required()
        .messages({ "any.required": "Username or email is required" }),

    password: Joi.string()
        .required()
        .messages({ "any.required": "Password is required" }),
});

const userValidations = {
    registerValidation,
    loginValidation,
};

module.exports = userValidations;