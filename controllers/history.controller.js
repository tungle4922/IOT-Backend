const express = require("express"),
  router = express.Router();

const service = require("../services/history.service");

router.post("/", async (req, res) => {
  const data = await service.getAllHistory(req.body);
  res.send(data);
});

router.post("/getAllByCurrentDate", async (req, res) => {
  const data = await service.getAllHistoryByCurrentDate(req.body);
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const data = await service.getHistoryById(req.params.id);
  if (data == undefined)
    res.status(404).json("Object not found with id : " + req.params.id);
  else res.send(data);
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteHistory(req.params.id);
  if (affectedRows === 0)
    res.status(404).json("Delete failed with id : " + req.params.id);
  else res.send("Deleted successfully.");
});

router.post("/create", async (req, res) => {
  await service.AddAHistory(req.body);
  res.status(201).send("Created successfully.");
});

router.put("/", async (req, res) => {
  await service.UpdateAHistory(req.body);
  res.status(201).send("Updated successfully.");
});

module.exports = router;
