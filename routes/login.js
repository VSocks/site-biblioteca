const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

// Página de login
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/login.html');
});

// Processar login
router.post('/', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM Funcionarios WHERE Email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send('Erro no servidor!');
    if (results.length === 0 || !(await bcrypt.compare(senha, results[0].Senha))) {
      return res.status(401).send('<h1>Email ou senha inválidos!</h1>');
    }
    res.redirect('/menu');
  });
});

module.exports = router;