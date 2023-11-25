require("dotenv").config();
const express = require("express");
const app = express();
const createError = require("http-errors");
const port = process.env.PORT || 5000;
const db = require("./db/lib");
const morgan = require("morgan");

const AuthRouter = require("./Routes/AuthRouter");
var cors = require("cors");

// use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// use Route
app.use("/auth", AuthRouter);

app.get("/", (req, res) =>
  res.json({
    data: "hello i m Home!",
  })
);

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
