const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./controllers/UserController");
const productController = require("./controllers/ProductController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use("/user", userController);
app.use("/product", productController);

app.listen(3001);
