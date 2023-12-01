const Joi = require("joi");

const ItemValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().optional(), // Make price optional
  description: Joi.string().min(5),
  product_id: Joi.number().optional(), // Make product_id optional
  // userId: Joi.userId(),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid userId format",
      "any.required": "userId is required",
    }),
});

module.exports = ItemValidationSchema;
