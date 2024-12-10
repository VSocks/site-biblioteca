const express = require('express');
const db = require('../database');
const router = express.Router();

// Rota para obter os dados de Funcionários
router.get('/dados/funcionarios', (req, res) => {
  const sql = 'SELECT * FROM Funcionarios';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Clientes
router.get('/dados/clientes', (req, res) => {
  const sql = 'SELECT * FROM Clientes';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Livros
router.get('/dados/livros', (req, res) => {
  const sql = 'SELECT * FROM Livros';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Empréstimos
router.get('/dados/emprestimos', (req, res) => {
  const sql = 'SELECT * FROM Emprestimos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Reservas
router.get('/dados/reservas', (req, res) => {
  const sql = 'SELECT * FROM Reservas'; // Supondo que a tabela Reservas já exista no banco
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Devoluções
router.get('/dados/devolucoes', (req, res) => {
  const sql = 'SELECT * FROM Devolucoes'; // Supondo que a tabela Reservas já exista no banco
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

module.exports = router;