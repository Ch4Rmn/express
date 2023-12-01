require("dotenv").config();
const express = require("express");
const app = express();
const createError = require("http-errors");
const port = process.env.PORT || 5000;
const db = require("./db/lib");
// morgan show speed
const morgan = require("morgan");
const AuthMiddleware = require("./Middleware/authMiddleware.js");
const AuthRouter = require("./Routes/AuthRouter");
// const client = require("./Helpers/init_redis");
const ItemRouter = require("./Routes/ItemRouter.js");
var cors = require("cors");

// client.SET("foo", "bar");

// client.SET("foo", (err, value) => {
//   if (err) console.log(err.message);
//   console.log(value);
// });

// use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// use Route
app.use("/auth", AuthRouter);

app.use("/api/", ItemRouter);

app.get("/", AuthMiddleware, async (req, res, next) => {
  // const header = await req.headers["authorization"];
  res.json({
    header: "home Page",
  });
});

//404 start ( should have in the end)
// middleware
app.use((req, res, next) => {
  next(createError.NotFound("unsupported Route"));
});

// error
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
//404 end

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
