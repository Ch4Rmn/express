const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
    // validate: {
    //   validator: function (v) {
    //     // Regular expression for email validation
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email address!`,
    // },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User",UserSchema)
module.exports = User
