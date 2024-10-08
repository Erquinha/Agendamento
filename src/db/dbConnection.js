const mysql = require ('mysql2/promise')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'estetica_plus'
});

async function getUSerById(id) {
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?, [id]');
  return rows[0];

}  

module.exports = {getUserById, connection};