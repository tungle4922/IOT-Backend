const mqtt = require("mqtt");
const dataSensorService = require("./dataSensor.service");
const historyService = require("./history.service");

class MQTTService {
  constructor(host, username, password, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.username = username;
    this.password = password;
    // this.messageCallback = messageCallback;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log("loi", err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    this.mqttClient.on("message", function (topic, message) {
      if (topic === "device/control") {
        const messArr = message
          .toString()
          .split(",")
          .map((item) => parseInt(item.trim()));
        console.log("test", messArr[0], messArr[1], messArr[2]);
        const temp = messArr[0];
        const hum = messArr[1];
        const light = messArr[2];
        const body = {
          temp: temp,
          hum: hum,
          light: light,
        };
        dataSensorService.AddADataSensor(body);
      }
      if (topic === "led/history") {
        const body = {
          device: "esp8266",
          action: message.toString(),
        };
        historyService.AddAHistory(body);
      }
      if (this.messageCallback) this.messageCallback(topic, message);
    });

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic);
  }
}

module.exports = MQTTService;
