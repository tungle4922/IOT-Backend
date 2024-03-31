const db = require("../db");

module.exports.getAllDataSensor = async (obj) => {
  let sqlParams = [];
  let sqlCondition = "";
  // Tìm theo temperature
  if (obj.temperature !== undefined && obj.temperature !== null) {
    sqlCondition += " AND temperature = ?";
    sqlParams.push(obj.temperature);
  }
  // Tìm theo humidity
  if (obj.humidity !== undefined && obj.humidity !== null) {
    sqlCondition += " AND humidity = ?";
    sqlParams.push(obj.humidity);
  }
  // Tìm theo humidity
  if (obj.humidity !== undefined && obj.humidity !== null) {
    sqlCondition += " AND humidity = ?";
    sqlParams.push(obj.humidity);
  }
  // Tìm theo light
  if (obj.light !== undefined && obj.light !== null) {
    sqlCondition += " AND light = ?";
    sqlParams.push(obj.light);
  }
  // Lấy tổng số lượng bản ghi
  const totalCountSql = `SELECT COUNT(*) as totalCount FROM iot_exam.datasensors WHERE 1=1 ${sqlCondition}`;
  const [totalCountResult] = await db.query(totalCountSql, sqlParams);
  const totalCount = totalCountResult[0].totalCount;
  // Lấy dữ liệu
  const sql = `SELECT * FROM iot_exam.datasensors WHERE 1=1 ${sqlCondition} LIMIT ? OFFSET ?`;
  const [data] = await db.query(sql, [
    ...sqlParams,
    obj.pageSize,
    (obj.page - 1) * obj.pageSize,
  ]);
  console.log(sqlParams);

  return { data, totalCount };
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
