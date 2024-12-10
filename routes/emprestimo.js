const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/emprestimo.html');
});

// Rota para processar o formulário de empréstimo
router.post('/', (req, res) => {
  const { clienteID, livroID } = req.body;

  // Verificar a quantidade de livros disponíveis
  const sqlVerificarDisponivel = `
    SELECT Disponiveis FROM Livros WHERE LivroID = ?
  `;
  
  db.query(sqlVerificarDisponivel, [livroID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao verificar a disponibilidade do livro.');
    }

    // Se não houver livros disponíveis
    if (result.length === 0 || result[0].Disponiveis <= 0) {
      return res.status(400).send('Não há livros disponíveis para empréstimo.<br><a href="/menu"><button>Voltar ao menu</button></a>');
    }

    // Se houver livros disponíveis, prossiga com o empréstimo
    const dataEmprestimo = new Date(); // Data atual
    const dataDevolucao = new Date(dataEmprestimo); // Clonar a data do empréstimo
    dataDevolucao.setDate(dataEmprestimo.getDate() + 7); // Adicionar 7 dias

    // Converter datas para o formato YYYY-MM-DD
    const dataEmprestimoFormatada = dataEmprestimo.toISOString().slice(0, 10);
    const dataDevolucaoFormatada = dataDevolucao.toISOString().slice(0, 10);

    // Inserir o empréstimo
    const sqlInserirEmprestimo = `
      INSERT INTO Emprestimos (LivroID, ClienteID, DataEmprestimo, DataDevolucao)
      VALUES (?, ?, ?, ?)
    `;
    
    db.query(
      sqlInserirEmprestimo,
      [livroID, clienteID, dataEmprestimoFormatada, dataDevolucaoFormatada],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao processar o empréstimo.');
        }

        // Atualizar a coluna "Disponiveis" na tabela Livros
        const sqlAtualizarDisponiveis = `
          UPDATE Livros
          SET Disponiveis = Disponiveis - 1
          WHERE LivroID = ?
        `;
        
        db.query(sqlAtualizarDisponiveis, [livroID], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar a quantidade de livros disponíveis.');
          }
          
          res.send(
            `Empréstimo realizado com sucesso! A data de devolução é ${dataDevolucaoFormatada}.<br><a href="/menu"><button>Voltar ao menu</button></a>`
          );
        });
      }
    );
  });
});

module.exports = router;