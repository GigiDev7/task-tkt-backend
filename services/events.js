const Event = require("../models/eventSchema");

exports.findEvents = (query) => {
  const filters = [];
  if (query.date) {
    filters.push(
      { year: new Date(query.date).getFullYear() },
      { month: new Date(query.date).getMonth() + 1 }
    );
  }
  if (query.title) {
    filters.push({ title: { $regex: query.title, $options: "i" } });
  }
  return Event.aggregate([
    {
      $addFields: { month: { $month: "$date" }, year: { $year: "$date" } },
    },
    {
      $match: {
        $and: [...filters],
      },
    },
    {
      $unset: ["month", "year"],
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
