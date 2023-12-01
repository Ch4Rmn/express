const express = require("express");
const ItemRouter = express.Router();

const [
  getItems,
  createItem,
  getItemById,
  paginateAndSearch,
  updateItem,
  deleteItem,
] = require("../Controllers/ItemController");

ItemRouter.get("/items", getItems);
ItemRouter.post("/createItem", createItem);
ItemRouter.post("/getItemById/:id", getItemById);
ItemRouter.get("/PaginateAndSearch", paginateAndSearch);
ItemRouter.put("/updateItem/:id", updateItem);
ItemRouter.delete("/deleteItem/:id", deleteItem);

module.exports = ItemRouter;
