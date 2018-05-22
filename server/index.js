const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

const routes = require("./routes/api");

// set up express app
const app = express();

app.use(cors())

// connect to mongodb
mongoose.connect("mongodb://admin:password@ds129770.mlab.com:29770/check-in");

app.use(express.static("public"));

// use body parser
app.use(bodyParser.json());

// initialize routes
app.use("/api", routes);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// get port for production and dev
const API_PORT = process.env.port || 4000;

app.listen(API_PORT, () => {
  console.log(`listening on port ${API_PORT}`);
});

module.exports = { app };
