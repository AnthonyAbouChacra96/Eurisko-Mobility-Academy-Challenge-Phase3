const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const newsRoutes = require("./routes/news-feed");
const authRoutes = require("./routes/auth");
const multer = require("multer");
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use("/news", newsRoutes);
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
	const message = error.message;
	const data=error.data;
  res.status(status).json({ message: message ,data:data });
});

mongoose
  .connect(
    "mongodb+srv://Anthony_Node:ArA538SJb8wV8PAx@cluster0.zb7cb.mongodb.net/news-api?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
