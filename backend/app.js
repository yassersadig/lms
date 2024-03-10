const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const cors = require("cors");
require("dotenv").config();
const Video = require("./models/Video");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors((origin = process.env.CORS_ORIGIN)));

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
app.use(videoRoutes);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});
