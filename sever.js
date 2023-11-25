require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db/lib");
const morgan = require("morgan");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({
    data: "hello",
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
