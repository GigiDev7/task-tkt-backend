const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Ticket price is required"],
  },
  eventName: {
    type: String,
    required: [true, "Event name is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is requried"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Ticket owner is required"],
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
