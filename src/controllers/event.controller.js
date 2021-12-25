const eventService = require("../service/event.service");
const fs = require("fs");
const Joi = require("joi");

const eventController = {
  createEvent: async (req, res) => {
    try {
      const event = await eventService.createNewEvent(req.body);
      if (event) {
        res
          .status(200)
          .send({ status: "success", message: "Event created successfully" });
      } else {
        res
          .send(409)
          .send({ status: "failure", message: "Failed to create event" });
      }
    } catch (error) {
      console.log("Error in event controller: createEvent", error);
    }
  },

  getEvent: async (req, res) => {
    try {
      const event = await eventService.getEvent();
      if (event) {
        res.status(200).send({
          status: "success",
          message: "Event fetched successfully",
          data: event,
        });
      } else {
        res
          .send(409)
          .send({ status: "failure", message: "Failed to fetch event" });
      }
    } catch (error) {
      console.log("Error in event controller: getEvent", error);
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await eventService.getEventById(req.params.id, null);
      if (event) {
        res.status(200).send({
          status: "success",
          message: "Event fetched successfully",
          data: event,
        });
      } else {
        res
          .send(409)
          .send({ status: "failure", message: "Failed to fetch event" });
      }
    } catch (error) {
      console.log("Error in event controller: getEventById", error);
    }
  },

  updateEvent: async (req, res) => {
    try {
      const getEvent = await eventService.getEventById(req.params.id);
      if (getEvent) {
        const event = await eventService.editEvent(req.params.id, req.body);
        if (event) {
          return res.status(200).send({
            status: "success",
            message: "Event updated successfully",
            data: event,
          });
        } else {
          return res
            .status(409)
            .send({ status: "failure", message: "Failed to update event" });
        }
      } else {
        res
          .status(404)
          .send({ status: "failure", message: "Event doesn't exists" });
      }
    } catch (error) {
      console.log("Error in event controller: updateEvent", error);
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const getEvent = await eventService.getEventById(req.params.id);
      if (getEvent) {
        const event = await eventService.deleteEvent(req.params.id);
        if (event) {
          res
            .status(200)
            .send({ status: "success", message: "Event deleted successfully" });
        } else {
          res
            .status(409)
            .send({ status: "failure", message: "Failed to delete event" });
        }
      } else {
        res
          .status(404)
          .send({ status: "failure", message: "Event doesn't exists" });
      }
    } catch (error) {
      console.log("Error in event controller: deleteEvent", error);
    }
  },

  deleteMultipeEvent: async (req, res) => {
    try {
      const event = await eventService.deleteMultipleEvent(req.body.data);
      if (event) {
        res
          .status(200)
          .send({ status: "success", message: "Event deleted successfully" });
      } else {
        res
          .status(409)
          .send({ status: "failure", message: "Failed to delete event" });
      }
    } catch (error) {
      console.log("Error in event controller: deleteMultipeEvent", error);
    }
  },

  fileUpload: async (req, res) => {
    try {
      let file = req.files.file;
      let file_name = Date.now() + file.name.replace(/\s/g, "");
      let file_path = "assets/images/" + file_name;
      let file_dir = "assets/images";

      if (!fs.existsSync(file_dir)) {
        fs.mkdirSync(file_dir, { recursive: true });
      }
      file.mv(file_path, async (err) => {
        if (err) {
          return res
            .status(422)
            .send({ status: "failure", message: "Failed to store image" });
        } else {
          let body = {
            url: `${process.env.DOMAIN}/${file_path}`,
          };
          return res
            .status(200)
            .send({
              status: "success",
              message: "Image uploaded successfully",
              data: body.url,
            });
        }
      });
    } catch (error) {
      console.log("Error in event controller: fileUpload", error);
    }
  },
};

module.exports = eventController;
