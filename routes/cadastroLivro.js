const express = require('express');
const db = require('../database'); // Certifique-se de que o arquivo de conexão com o banco está correto
const router = express.Router();

// Página de cadastro
router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/cadastroLivro.html');
});

// Processar cadastro de livros
router.post('/', (req, res) => {
  const { titulo, autor, genero, anoPublicacao, editora, quantidade } = req.body;
  const disponiveis = quantidade;

  const sqlCadastrarLivro = `
    INSERT INTO Livros (Titulo, Autor, Genero, AnoPublicacao, Editora, Quantidade, Disponiveis)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sqlCadastrarLivro,
    [titulo, autor, genero, anoPublicacao, editora, quantidade, disponiveis],
    (err) => {
      if (err) {
        console.error('Erro ao cadastrar livro:', err);
        return res.status(500).send('Erro ao cadastrar livro.');
      }
      res.send('Livro cadastrado com sucesso!<br><a href="/menu"><button>Voltar ao Menu</button></a>');
    }
  );
});

module.exports = router;
