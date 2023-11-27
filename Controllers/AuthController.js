require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../Models/AuthSchema.js");
const AuthSchema = require("../Helpers/validationSchema.js");
const Joi = require("@hapi/joi");

const RegisterUser = async (req, res, next) => {
  // Create
  // const { email, password } = req.body;

  // if (!email || !password) throw createError.BadRequest();

  const result = await AuthSchema.validateAsync(req.body);
  // res.send(result);

  const existingUser = await User.findOne({ email: result.email });

  try {
    if (!existingUser) {
      // bcrypt
      // const hashPass = await bcrypt.hash(result.password, 10);

      //   const User cant same with model User
      const user = await User.create({
        email: result.email,
        password: result.password,
      });

      //   jwt
      const token = await jwt.sign(
        { email: user.email, id: user._id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      const ref_token = await jwt.sign(
        { email: user.email, id: user._id },
        process.env.REFRESH_ACCESS_TOKEN,
        {
          expiresIn: "1y",
        }
      );

      res.status(201).json({
        User: user,
        token: token,
        ref_token: ref_token,
        message: "User created (Complete)",
      });
    } else {
      throw createError.Conflict(`${email} has been already Register`);
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await AuthSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User not Registered");

    // const verifyPassword = await bcrypt.compare(result.password, user.password);

    // compare with authSchema.js
    const verifyPassword = await user.isValidPassword(result.password);
    if (!verifyPassword) throw createError.Unauthorized("wrong Password");

    const token = await jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN
    );

    const ref_token = await jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_ACCESS_TOKEN,
      {
        expiresIn: "1y",
      }
    );

    res.json({ user: user, token: token, ref_token: ref_token });
  } catch (error) {
    if (error.isJoi == true)
      return next(createError.BadRequest("email/password invalid"));
    next(error);
  }
};

const refresh_tokenUser = async (req, res, next) => {
  // const { token } = req.body;

  // res.send(token);
  try {
    const { ref_token } = req.body;
    // res.send({ref_token,message:"ok"})
    if (!ref_token) throw createError.BadGateway("need token!");
    const ref = await jwt.verify(ref_token, process.env.REFRESH_ACCESS_TOKEN);

    const token = jwt.sign(ref, process.env.ACCESS_TOKEN);
    const refToken = jwt.sign(ref, process.env.REFRESH_ACCESS_TOKEN);
    res.send({ token, refToken });
  } catch (error) {
    if (error.isJoi == true) throw createError.Unauthorized();
    next(error);
  }
};

const logoutUser = async (req, res, next) => {};

module.exports = [RegisterUser, loginUser, refresh_tokenUser, logoutUser];
