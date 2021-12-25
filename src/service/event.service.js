const Event = require("../models/event.model");

const eventService = {
  createNewEvent: async (body) => {
    const event = await Event.create(body);
    return event;
  },

  getEvent: async () => {
    const event = await Event.find().sort({ created_at: -1});
    return event;
  },

  getEventById: async (id, name) => {
    const query = {};
    if (id) {
      query._id = id;
    } else if (name) {
      query.name = name;
    }
    const event = await Event.findOne(query);
    return event;
  },

  editEvent: async (id, update) => {
    const query = { _id: id };
    const updateEvent = await Event.findByIdAndUpdate(query, update);
    if (updateEvent) {
      const event = await eventService.getEventById(id, null);
      return event;
    } else {
      return null;
    }
  },

  deleteEvent: async (id) => {
    const query = { _id: id };
    const event = await Event.findByIdAndDelete(query);
    return event;
  },

  deleteMultipleEvent: async (Ids) => {
    const event = await Event.deleteMany({ _id: { $in: Ids } });
    return event;
  },
};

module.exports = eventService;
