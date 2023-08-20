const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

// Event: When the connection is established
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

// Event: If there's an error during connection
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Event: When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB Atlas");
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to the DB");
  })
  .catch((e) => {
    console.log("Error while connecting to mongo", e);
  });
