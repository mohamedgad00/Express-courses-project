require("dotenv").config(); // to load environment variables from .env file
const express = require("express");
const app = express();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to serve static files from uploads folder

const cors = require("cors");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
const url = process.env.MONGO_URL;
// we use .env package to manage environment variables
// 12factor.net important !!!!!

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors()); // to enable CORS for all routes
app.use(express.json()); // to parse JSON bodies

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// global middleware for handling not found router
// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: httpStatusText.ERROR,
//     message: "Not Found",
//   });
// });

// global error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message,
    code: err.statusCode || 500,
    data: null,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${process.env.PORT}`);
});

// put vs patch (put - full update, patch - partial update)
// CRUD (Create, Read, Update, Delete).
// express validator library
// joi library

// CORS - Cross Origin Resource Sharing problem
