const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Tung4922@",
  database: "iot_exam",
});

mysqlPool
  .query("SELECT 1")
  .then((data) => {
    console.log(data);
  })
  .catch(console.log("error"))
  .then(() => mysqlPool.end());

module.exports = mysqlPool;
