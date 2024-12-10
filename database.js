const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.1.254',
  user: 'user2023108014',      // Ajuste conforme seu usuário do MySQL
  password: '2023108014',      // Ajuste conforme sua senha do MySQL
  database: 'db2023108014'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;
