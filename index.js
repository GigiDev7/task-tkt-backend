const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./db");
const userRouter = require("./routes/user");
const ticketRouter = require("./routes/ticket");
const eventsRouter = require("./routes/events");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
dotenv.config();

//conf
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/user", userRouter);
app.use("/tickets", ticketRouter);
app.use("/events", eventsRouter);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
