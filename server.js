const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const apiRoute =require("./routes/apiRoutes");
const htmlRoute = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology:true
});

// routes
app.use(apiRoute);
app.use(htmlRoute);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
