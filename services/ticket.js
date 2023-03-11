const mongoose = require("mongoose");
const Ticket = require("../models/ticketSchema");

exports.findTickets = async (eventId) => {
  const tickets = await Ticket.aggregate([
    {
      $match: {
        event: new mongoose.Types.ObjectId(eventId),
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

exports.createTicket = async (price, userId, eventId) => {
  const newTicket = await Ticket.create({
    price,
    owner: userId,
    event: eventId,
  });
  return newTicket;
};
