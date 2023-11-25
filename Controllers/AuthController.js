const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../Models/AuthSchema.js");

const RegisterUser = async (req, res, next) => {
  // Create
  const { email, password } = req.body;
  if (!email || !password) throw createError.BadRequest();

  const existingUser = await User.findOne({ email: email });

  try {
    if (!existingUser) {
      const hashPass = await bcrypt.hash(password, 10);

      //   const User cant same with model User
      const user = await User.create({
        email: email,
        password: hashPass,
      });

      //   jwt
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({
        User: user,
        token: token,
        message: "User created (Complete)",
      });
    } else {
      throw createError.Conflict(`${email} has been already Register`);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {};

const refresh_tokenUser = async (req, res, next) => {};

const logoutUser = async (req, res, next) => {};

module.exports = [RegisterUser, loginUser, refresh_tokenUser, logoutUser];
