const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'final_project',
    password: "haifa605",
    multipleStatements: true,
});


module.exports = pool.promise()
// connectionLimit: 11,
// connectionLimit: 10,
// queueLimit: 10
// waitForConnections: true,
// connectionLimit: 10,
// queueLimit: 0