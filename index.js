const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const eventRouter = require("./src/routes/event.routes");

const port = process.env.PORT || 8000;
db();
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.json());
app.use(cors());
app.use("/api/event", eventRouter);

app.listen(port, () => {
  console.log("Server is listening", port);
});
