const Item = require("./ItemController");
const ItemValidationSchema = require("./ItemController");
const createError = require("http-errors");

const getItems = (req, res, next) => {
  try {
    
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const createItem = (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const getItemById = (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const paginateAndSearch = (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const updateItem = (req, res, next) => {
  try {
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};
const deleteItem = (req, res, next) => {
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
