const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

// Página de cadastro
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/cadastroFuncionario.html');
});

// Processar cadastro
router.post('/', async (req, res) => {
  const { nome, telefone, cargo, dataAdmissao, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 15);
    const sql = 'INSERT INTO Funcionarios (Nome, Telefone, Cargo, DataAdmissao, Email, Senha) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, telefone, cargo, dataAdmissao, email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Erro no servidor!');
      res.send('Cadastro realizado com sucesso!<br><a href="/login"><button>Ir para Login</button></a>');
    });
  } catch (err) {
    res.status(500).send('Erro no servidor!');
  }
});

module.exports = router;