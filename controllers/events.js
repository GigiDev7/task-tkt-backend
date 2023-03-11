const {
  findEvents,
  findEvent,
  createEvent,
  removeEvent,
} = require("../services/events");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await findEvents(req.query);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await findEvent(req.params.eventId);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

exports.addEvent = async (req, res, next) => {
  try {
    const newEvent = await createEvent(req.body);
    res.status(200).json(newEvent);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await removeEvent(req.params.eventId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
