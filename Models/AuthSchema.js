const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
    // validate: {
    //   validator: emailValidator,
    //   message: (props) => `${props.value} is not a valid email address!`,
    // },
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
