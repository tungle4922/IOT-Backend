const db = require("../db");

module.exports.getAllHistory = async (obj) => {
  let sqlParams = [];
  let sqlCondition = "";
  // Tìm theo temperature
  if (obj.device !== undefined && obj.device !== null && obj.device !== "") {
    sqlCondition += " AND device = ?";
    sqlParams.push(obj.device);
  }
  // Tìm theo temperature
  if (obj.action !== undefined && obj.action !== null && obj.action !== "") {
    sqlCondition += " AND action = ?";
    sqlParams.push(obj.action);
  }
  // Tìm theo ngày tạo
  if (obj.createdDate !== undefined && obj.createdDate !== null) {
    const startDate = new Date(obj.createdDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(obj.createdDate);
    endDate.setUTCHours(23, 59, 59, 59);
    sqlCondition += " AND createdDate >= ? AND createdDate < ?";
    sqlParams.push(startDate.toISOString());
    sqlParams.push(endDate.toISOString());
  }
  // Lấy tổng số lượng bản ghi
  const totalCountSql = `SELECT COUNT(*) as totalCount FROM iot_exam.history WHERE 1=1 ${sqlCondition}`;
  const [totalCountResult] = await db.query(totalCountSql, sqlParams);
  const totalCount = totalCountResult[0].totalCount;
  // Lấy dữ liệu
  const sql = `SELECT * FROM iot_exam.history WHERE 1=1 ${sqlCondition} ORDER BY 1 DESC LIMIT ? OFFSET ?`;
  const [data] = await db.query(sql, [
    ...sqlParams,
    obj.pageSize,
    (obj.page - 1) * obj.pageSize,
  ]);
  console.log(sqlParams);

  return { data, totalCount };
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
