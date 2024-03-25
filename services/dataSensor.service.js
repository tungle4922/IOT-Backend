const db = require("../db");

module.exports.getAllDataSensor = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = "SELECT * FROM iot_exam.datasensors LIMIT ? OFFSET ?";
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.sortDataSensorHighToLow = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = `SELECT * FROM iot_exam.datasensors ORDER BY ${obj.fieldName} DESC LIMIT ? OFFSET ?`;
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.sortDataSensorLowToHigh = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = `SELECT * FROM iot_exam.datasensors ORDER BY ${obj.fieldName} ASC LIMIT ? OFFSET ?`;
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getAllDataSensorByCurrentDate = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql =
    "SELECT * FROM iot_exam.datasensors WHERE DATE(createdDate) = CURDATE() LIMIT ? OFFSET ?";
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getDataSensorById = async (id) => {
  const [[record]] = await db.query(
    "SELECT * FROM iot_exam.datasensors WHERE id = ?",
    [id]
  );
  return record;
};

module.exports.deleteDataSensor = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM iot_exam.datasensors WHERE id = ?",
    [id]
  );
  return affectedRows;
};

module.exports.AddADataSensor = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "INSERT INTO iot_exam.datasensors (temperature, humidity, light, createdDate) VALUES (?, ?, ?, NOW())",
    [obj.temp, obj.hum, obj.light]
  );
  return affectedRows;
};

module.exports.UpdateDataSensor = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "UPDATE iot_exam.datasensors SET temperature = ?, humidity = ?, light = ?, lastModifiedDate = NOW() WHERE id = ?",
    [obj.temp, obj.hum, obj.light, obj.id]
  );
  return affectedRows;
};
