const Joi = require('joi');

const createEvent = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  banner: Joi.string().optional()
});

const updateEvent = Joi.object({
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  banner: Joi.string().optional()
});


module.exports = { createEvent, updateEvent }


