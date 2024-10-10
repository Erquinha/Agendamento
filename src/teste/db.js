const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database: 'agendamento_plus'
});


async function getUserById(id) {
    const [rows] = await connection.query('SELECT * FROM agendamento WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { getUserById, connection };