const express = require("express");
const AuthRouter = express.Router();

// AuthRouter.post("/register", (req, res) => {
//     console.log(req.body);
//   res.send("register");
// });
// AuthRouter.post("/login", (req, res) => {
//   res.send("login");
// });
// AuthRouter.post("/refresh-token", (req, res) => {
//   res.send("refresh-token");
// });
// AuthRouter.delete("/logout", (req, res) => {
//   res.send("logout");
// });

const [
  RegisterUser,
  loginUser,
  refresh_tokenUser,
  logoutUser,
] = require("../Controllers/AuthController");

AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/refresh-token", refresh_tokenUser);
AuthRouter.delete("/logout", loginUser);

module.exports = AuthRouter;
