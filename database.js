const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Ajuste conforme seu usuário do MySQL
  password: 'YOURNEWPASSWORD',      // Ajuste conforme sua senha do MySQL
  database: 'Biblioteca'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;