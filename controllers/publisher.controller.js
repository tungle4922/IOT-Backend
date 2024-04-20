const mqttService = require("../services/mqtt.service");
const express = require("express");
const router = express.Router();

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://192.168.1.8:1888";
const USERNAME = "admin1";
const PASSWORD = "1234";

var mqttClient = new mqttService(MQTT_HOST_NAME, USERNAME, PASSWORD);
mqttClient.connect();

router.get("/", async function (req, res) {
  try {
    res.render("pages/publisher");
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

router.post("/", async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    mqttClient.publish(topic, message, {});
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
