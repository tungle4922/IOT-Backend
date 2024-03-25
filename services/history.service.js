const db = require("../db");

module.exports.getAllHistory = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = "SELECT * FROM iot_exam.history LIMIT ? OFFSET ?";
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getAllHistoryByCurrentDate = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql =
    "SELECT * FROM iot_exam.history WHERE DATE(createdDate) = CURDATE() LIMIT ? OFFSET ?";
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getHistoryById = async (id) => {
  const [[record]] = await db.query(
    "SELECT * FROM iot_exam.history WHERE id = ?",
    [id]
  );
  return record;
};

module.exports.deleteHistory = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM iot_exam.history WHERE id = ?",
    [id]
  );
  return affectedRows;
};

module.exports.AddAHistory = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "INSERT INTO iot_exam.history (device, action, createdDate) VALUES (?, ?, NOW())",
    [obj.device, obj.action]
  );
  return affectedRows;
};

module.exports.UpdateAHistory = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "UPDATE iot_exam.history SET device = ?, action = ?, lastModifiedDate = NOW() WHERE id = ?",
    [obj.device, obj.action, obj.id]
  );
  return affectedRows;
};
