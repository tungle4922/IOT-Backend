const express = require("express"),
  app = express(),
  bodyparser = require("body-parser");
require("express-async-errors");
const cors = require("cors");

const db = require("./db");
const dataSensorRoutes = require("./controllers/dataSensor.controller");
const historyRoutes = require("./controllers/history.controller");
const subscriberRoutes = require("./controllers/subscriber.controller");
const publisherRoutes = require("./controllers/publisher.controller");

//middleware
app.use(cors());
app.use(bodyparser.json());
app.use("/api/dataSensor", dataSensorRoutes);
app.use("/api/history", historyRoutes);
app.use("/subscriber", subscriberRoutes);
app.use("/publisher", publisherRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!");
});

//first make sure db connection is successful
//then start the express server.
db.query("SELECT 1")
  .then(() => {
    console.log("db connection  succeeded.");
    app.listen(3000, () => console.log("server started at 3000"));
  })
  .catch((err) => console.log("db connection failed. \n" + err));
