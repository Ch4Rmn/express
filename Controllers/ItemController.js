const Item = require("../Models/ItemSchema");
const ItemValidationSchema = require("../Helpers/ItemValidationSchema");
const createError = require("http-errors");

const getItems = async (req, res, next) => {
  try {
    // const items = await Item.find();
    const items = await Item.find();
    if (!items) throw createError.NotFound();

    res.status(201).json({
      items: items,
      totalItems: items.length,
    });
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, price, product_id, description, userId } = req.body;
    // const result = await ItemValidationSchema.validateAsync(req.body);

    // const result = await {
    //   name,
    //   price,
    //   product_id,
    //   description,
    //   userId,
    // };

    const item = await Item.create({
      // result,
      name: name,
      price: price,
      product_id: product_id,
      description: description,
      userId: userId,
    });
    res.status(201).json({ item: item, message: "item created", error: false });
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const paginateAndSearch = async (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};
const deleteItem = async (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

module.exports = [
  getItems,
  createItem,
  getItemById,
  paginateAndSearch,
  updateItem,
  deleteItem,
];
