const express = require('express');
const db = require('../database'); // Certifique-se de que o arquivo de conexão com o banco está correto
const router = express.Router();

// Página de cadastro
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/emprestimo.html');
});

// Processar cadastro de livros
router.post('/', (req, res) => {
  const { livroID, clienteID, dataEmprestimo } = req.body;

  const sql = `
    INSERT INTO Emprestimos (LivroID, ClienteID, DataEmprestimo)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [livroID, clienteID, dataEmprestimo],
    (err) => {
      if (err) {
        console.error('Erro ao realizar empréstimo:', err);
        return res.status(500).send('Erro ao realizar empréstimo.');
      }
      res.send('<h1>Empréstimo realizado com sucesso!</h1><a href="/menu">Voltar ao Menu</a>');
    }
  );
});

module.exports = router;