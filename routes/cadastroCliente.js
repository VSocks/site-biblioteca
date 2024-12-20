const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

// Página de cadastro de clientes
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/cadastroCliente.html');
});

// Processar cadastro de clientes
router.post('/', async (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 15);
    const sql = 'INSERT INTO Clientes (Nome, Telefone, Email, Senha) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, telefone, email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Erro no servidor!');
      res.send('Cliente cadastrado com sucesso!<br><a href="/"><button>Voltar</button></a>');
    });
  } catch (err) {
    res.status(500).send('Erro no servidor!');
  }
});

module.exports = router;
