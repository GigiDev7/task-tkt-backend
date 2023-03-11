const Event = require("../models/eventSchema");

exports.findEvents = (query) => {
  const filters = [];
  if (query.date) {
    filters.push({ date: new Date(query.date) });
  }
  if (query.title) {
    filters.push({ title: { $regex: query.title, $options: "i" } });
  }
  return Event.aggregate([
    {
      $match: {
        $and: [...filters],
      },
    },
  ]);
};

exports.findEvent = (eventId) => {
  return Event.findById(eventId);
};

exports.createEvent = (eventData) => {
  return Event.create(eventData);
};

exports.removeEvent = (eventid) => {
  return Event.findByIdAndDelete(eventid);
};
