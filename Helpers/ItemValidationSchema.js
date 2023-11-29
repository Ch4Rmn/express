const Joi = require("joi");

const ItemValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().min(5),
  userId: Joi.userId(),
});

module.exports = ItemValidationSchema;
