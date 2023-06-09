const express = require("express");
const { getTickets, addTicket } = require("../controllers/ticket");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.route("/:eventId").get(getTickets).post(protectAuth, addTicket);

module.exports = router;
