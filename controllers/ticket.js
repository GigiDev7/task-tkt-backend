const { findTickets, createTicket } = require("../services/ticket");

exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await findTickets(req.params.eventId);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

exports.addTicket = async (req, res, next) => {
  try {
    const newTicket = await createTicket(
      req.body.price,
      req.user._id,
      req.params.eventId
    );
    res.status(200).json(newTicket);
  } catch (error) {
    next(error);
  }
};
