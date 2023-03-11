const Ticket = require("../models/ticketSchema");

exports.findTickets = async (eventId) => {
  const tickets = await Ticket.aggregate([
    {
      $match: {
        event: eventId,
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
      },
    },
    {
      $lookup: {
        from: "events",
        foreignField: "_id",
        localField: "event",
        as: "event",
      },
    },
    {
      $unwind: { path: "$owner" },
    },
    {
      $unwind: { path: "$event" },
    },
    {
      $unset: ["owner.password", "owner.__v", "__v", "event.__v"],
    },
  ]);

  return tickets;
};

exports.createTicket = async (ticketData, userId, eventId) => {
  const newTicket = await Ticket.create({
    ...ticketData,
    owner: userId,
    event: eventId,
  });
  return newTicket;
};
