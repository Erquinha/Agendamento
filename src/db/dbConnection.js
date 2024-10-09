const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database: 'estetica_plus'
});


async function getUserById(id) {
    const [rows] = await connection.query('SELECT * FROM agendamento WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { connection, getUserById };