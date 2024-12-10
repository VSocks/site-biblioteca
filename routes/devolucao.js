const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname.replace('routes', 'views') + '/devolucao.html');
});

// Rota para registrar uma nova devolução
router.post('/', (req, res) => {
  const { emprestimoID, condicaoLivro } = req.body;

  // Verificar se o empréstimo existe e se ainda não foi devolvido
  const sqlVerificarEmprestimo = `
    SELECT Emprestimos.LivroID, Devolucoes.DevolucaoID 
    FROM Emprestimos 
    LEFT JOIN Devolucoes ON Emprestimos.EmprestimoID = Devolucoes.EmprestimoID
    WHERE Emprestimos.EmprestimoID = ? AND Devolucoes.DevolucaoID IS NULL
  `;
  
  db.query(sqlVerificarEmprestimo, [emprestimoID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao verificar o empréstimo.');
    }

    // Se o empréstimo não existir ou já tiver sido devolvido
    if (result.length === 0) {
      return res.status(400).send('Empréstimo inválido ou já devolvido.<br><a href="/menu"><button>Voltar ao menu</button></a>');
    }

    const livroID = result[0].LivroID;

    // Registrar a devolução
    const dataDevolucao = new Date(); // Data atual
    const dataDevolucaoFormatada = dataDevolucao.toISOString().slice(0, 10);

    const sqlRegistrarDevolucao = `
      INSERT INTO Devolucoes (EmprestimoID, DataDevolucao, CondicaoLivro)
      VALUES (?, ?, ?)
    `;
    
    db.query(sqlRegistrarDevolucao, [emprestimoID, dataDevolucaoFormatada, condicaoLivro], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao registrar a devolução.');
      }

      // Atualizar a quantidade de livros disponíveis
      const sqlAtualizarDisponiveis = `
        UPDATE Livros
        SET Disponiveis = Disponiveis + 1
        WHERE LivroID = ?
      `;
      
      db.query(sqlAtualizarDisponiveis, [livroID], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao atualizar a quantidade de livros disponíveis.');
        }

        res.send('Devolução registrada com sucesso!<br><a href="/menu"><button>Voltar ao Menu</button></a>');
      });
    });
  });
});

// Rota para exibir todas as devoluções
router.get('/list', (req, res) => {
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