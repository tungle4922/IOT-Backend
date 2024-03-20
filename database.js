const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Tung4922@',
    database: 'iot_exam'
})


module.exports = mysqlPool