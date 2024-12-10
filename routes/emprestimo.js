const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/emprestimo.html');
});

// Rota para processar o formulário de empréstimo
router.post('/', (req, res) => {
  const { clienteID, livroID } = req.body;

  const dataEmprestimo = new Date(); // Data atual
  const dataDevolucao = new Date(dataEmprestimo); // Clonar a data do empréstimo
  dataDevolucao.setDate(dataEmprestimo.getDate() + 7); // Adicionar 7 dias

  // Converter datas para o formato YYYY-MM-DD
  const dataEmprestimoFormatada = dataEmprestimo.toISOString().slice(0, 10);
  const dataDevolucaoFormatada = dataDevolucao.toISOString().slice(0, 10);

  const sql = `
    INSERT INTO Emprestimos (LivroID, ClienteID, DataEmprestimo, DataDevolucao)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [livroID, clienteID, dataEmprestimoFormatada, dataDevolucaoFormatada],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao processar o empréstimo.');
      }
      res.send(
        `Empréstimo realizado com sucesso! A data de devolução é ${dataDevolucaoFormatada}<br><a href="/menu"><button>Voltar ao menu<button></a>.`
      );
    }
  );
});

module.exports = router;