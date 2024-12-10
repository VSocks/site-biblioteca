const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/reserva.html');
});

// Rota para processar o formulário de reserva
router.post('/', (req, res) => {
  const { clienteID, livroID } = req.body;
  const dataReserva = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD

  const sql = `
    INSERT INTO Reservas (LivroID, ClienteID, DataReserva)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [livroID, clienteID, dataReserva], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao processar a reserva.');
    }
    res.send('Reserva realizada com sucesso!<a href="/menu"><button>Voltar ao menu<button></a>');
  });
});

module.exports = router;