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
      message: "get all item success",
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
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) throw createError.NotFound();

    res.send({
      item: item,
      message: "get by id complete",
      code: 200,
    });
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const paginateAndSearch = async (req, res, next) => {
  try {
    // GET /your-endpoint?page=1&perPage=10&search=query

    // const { page, perPage } = req.query;
    const page = req.query.page;
    const perPage = req.query.perPage;
    const offset = (page - 1) * perPage;
    const search = req.query.search;

    const filter = {};
    if (search) {
      filter["$text"] = { search: search };
    }

    const item = await Item.find(filter).limit(perPage).skip(offset);
    const total = await Item.countDocuments(filter);
    res.send({
      item: item,
      message: "get all item success",
      code: 200,
      total: total,
      nowShowData: item.length,
    });
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, price, product_id, userId } = req.body;
    const update = {
      name: name,
      description: description,
      product_id: product_id,
      userId: userId,
      price: price,
    };
    const item = await Item.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({
      updateItem: item,
      message: "Update Item with ID",
    });
  } catch (error) {
    if (error.isJoi == true) throw createError.BadRequest();

    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);
    res.send({
      deleteItem: item,
      message: "item deleted",
      code: 204,
    });
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
