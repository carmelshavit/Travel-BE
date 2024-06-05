require("dotenv").config();
const mongodb = require("./database/mongodb.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
 app.use(
   bodyParser.urlencoded({
     limit: "50mb",
     parameterLimit: 100000000,
   })
 );

 app.use(
   bodyParser.json({
     limit: "50mb",
     parameterLimit: 10000000,
   })
 );

app.use(require("cors")());
app.use(express.json());

app.use("/signup", require("./routes/users/signup.js"));
app.use("/login", require("./routes/users/login.js"));
app.use("/gptData", require("./routes/gptData/addPlace.js"));
app.use("/profile", require("./routes/users/profile.js"));
app.use("/users", require("./routes/users/user.js"));
app.use("/gpt", require("./routes/aiAPIs/apis.js"));
app.use("/review", require("./routes/reviews/reviews.js"));
app.use("/trip", require("./routes/trips/trips.js"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const hostname = "0.0.0.0";
const port = process.env.PORT || 3001;

app.listen(port, hostname, () => {
  mongodb.connect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
