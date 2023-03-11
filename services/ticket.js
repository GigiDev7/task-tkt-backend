const Ticket = require("../models/ticketSchema");

exports.findTickets = async (query) => {
  const filters = [];

  if (query.date) {
    filters.push({ date: new Date(query.date) });
  }
  if (query.eventName) {
    filters.push({ eventName: { $regex: query.eventName, $options: "i" } });
  }

  if (!filters.length) {
    return Ticket.find().populate("owner", "-password");
  }

  const tickets = await Ticket.aggregate([
    {
      $match: {
        $and: [...filters],
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
      $unwind: { path: "$owner" },
    },
    {
      $unset: ["owner.password", "owner.__v", "__v"],
    },
  ]);

  return tickets;
};

exports.createTicket = async (ticketData, userId) => {
  const newTicket = await Ticket.create({ ...ticketData, owner: userId });
  return newTicket;
};
