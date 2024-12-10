const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname.replace('routes', 'views') + '/devolucao.html');
  });

// Rota para registrar uma nova devolução
router.post('/', (req, res) => {
  const { emprestimoID, condicaoLivro } = req.body;

  const dataDevolucao = new Date(); // Data atual
  const dataDevolucaoFormatada = dataDevolucao.toISOString().slice(0, 10);

  const sql = `
    INSERT INTO Devolucoes (EmprestimoID, DataDevolucao, CondicaoLivro)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [emprestimoID, dataDevolucaoFormatada, condicaoLivro], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao registrar devolução.');
    }
    res.send('Devolução registrada com sucesso!<br><a href="/menu"><button>Voltar ao Menu</button></a>');
  });
});

// Rota para exibir todas as devoluções
router.get('/', (req, res) => {
  const sql = `
    SELECT Devolucoes.DevolucaoID, Devolucoes.DataDevolucao, Devolucoes.CondicaoLivro, Emprestimos.EmprestimoID, Livros.Titulo
    FROM Devolucoes
    JOIN Emprestimos ON Devolucoes.EmprestimoID = Emprestimos.EmprestimoID
    JOIN Livros ON Emprestimos.LivroID = Livros.LivroID
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar devoluções.');
    }
    res.json(results);
  });
});

module.exports = router;