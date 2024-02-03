const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "digistar_database"
})

module.exports = db