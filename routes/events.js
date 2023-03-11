const express = require("express");
const {
  addEvent,
  deleteEvent,
  getEvent,
  getEvents,
} = require("../controllers/events");
const { protectAuth } = require("../middlewares/protectAuth");
const { protectAdmin } = require("../middlewares/protectAdmin");

const router = express.Router();

router.route("/").get(getEvents).post(protectAuth, protectAdmin, addEvent);
router
  .route("/:eventId")
  .get(getEvent)
  .delete(protectAuth, protectAdmin, deleteEvent);

module.exports = router;
