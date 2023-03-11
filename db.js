const mongoose = require("mongoose");

(async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://user:user@cluster0.zstge.mongodb.net/task-tkt?retryWrites=true&w=majority"
  );
  console.log("Connected to DB");
})();
