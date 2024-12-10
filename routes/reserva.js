const express = require('express');
const db = require('../database'); // Certifique-se de que o arquivo de conexão com o banco está correto
const router = express.Router();

// Página de cadastro
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/reserva.html');
});

// Processar cadastro de livros
router.post('/', (req, res) => {
  const { livroID, clienteID, dataReserva } = req.body;

  const sql = `
    INSERT INTO Reservas (LivroID, ClienteID, DataReserva)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [livroID, clienteID, dataReserva],
    (err) => {
      if (err) {
        console.error('Erro ao realizar reserva:', err);
        return res.status(500).send('Erro ao realizar reserva.');
      }
      res.send('<h1>Reserva realizado com sucesso!</h1><a href="/menu">Voltar ao Menu</a>');
    }
  );
});

module.exports = router;