const Joi = require("joi");

const addFriendValidation = Joi.object().keys({
  friend_name: Joi.string().required().messages({
    "any.required": "friend name is required",
  }),
  friend_contact: Joi.string()
    .required()
    .messages({ "any.required": "friend contact is required" }),
  friend_address: Joi.string()
    .required()
    .messages({ "any.required": "friend address is required" }),
  friend_type: Joi.string()
    .required()
    .messages({ "any.required": "friend type is required" }),
  current_user_id: Joi.string(),
});

const friendValidations = {
  addFriendValidation,
};

module.exports = friendValidations;
