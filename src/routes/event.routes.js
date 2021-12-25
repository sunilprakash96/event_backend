const express = require("express");
const app = express();
const router = express.Router();
const eventController = require("../controllers/event.controller");
const validation = require('../helper/validation.helper');
const validator = require('express-joi-validation').createValidator({})


router.post("/create", validator.body(validation.createEvent), eventController.createEvent);
router.get("/get", eventController.getEvent);
router.get("/get/:id", eventController.getEventById);
router.put("/edit/:id", validator.body(validation.updateEvent), eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);
router.post("/delete", eventController.deleteMultipeEvent);
router.post("/image_upload", eventController.fileUpload);

module.exports = router;
