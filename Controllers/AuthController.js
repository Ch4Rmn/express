const User = require("../Models/AuthSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res, next) => {
  console.log(req.body);
    res.send("register");
};

const loginUser = async (req, res, next) => {};

const refresh_tokenUser = async (req, res, next) => {};

const logoutUser = async (req, res, next) => {};

module.exports = [RegisterUser, loginUser, refresh_tokenUser, logoutUser];
