const express = require("express"),
  router = express.Router();

const service = require("../services/dataSensor.service");

router.post("/", async (req, res) => {
  const data = await service.getAllDataSensor(req.body);
  res.send(data);
});

router.post("/getAllByCurrentDate", async (req, res) => {
  const data = await service.getAllDataSensorByCurrentDate(req.body);
  res.send(data);
});

router.post("/sort/highToLow", async (req, res) => {
  const data = await service.sortDataSensorHighToLow(req.body);
  res.send(data);
});

router.post("/sort/lowToHigh", async (req, res) => {
  const data = await service.sortDataSensorLowToHigh(req.body);
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const data = await service.getDataSensorById(req.params.id);
  if (data == undefined)
    res.status(404).json("Object not found with id : " + req.params.id);
  else res.send(data);
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteDataSensor(req.params.id);
  if (affectedRows === 0)
    res.status(404).json("Delete failed with id : " + req.params.id);
  else res.send("Deleted successfully.");
});

router.post("/create", async (req, res) => {
  await service.AddADataSensor(req.body);
  res.status(201).send("Created successfully.");
});

router.put("/", async (req, res) => {
  await service.UpdateDataSensor(req.body);
  res.status(201).send("Updated successfully.");
});

module.exports = router;
