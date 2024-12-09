const express = require('express');
const bodyParser = require('body-parser');
const cadastroClienteRoutes = require('./routes/cadastroCliente'); // Alteração da branch feature/cadastro_cliente
const cadastroFuncionarioRoutes = require('./routes/cadastroFuncionario');
const cadastroLivroRoutes = require('./routes/cadastroLivro');
const loginRoutes = require('./routes/login');
const db = require('./database');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rota para o menu
app.get('/menu', (req, res) => {
  res.sendFile(__dirname + '/views/menu.html');
});

// Rotas de Cadastro e Login
app.use('/cadastroCliente', cadastroClienteRoutes); // Alteração da branch feature/cadastro_cliente
app.use('/cadastroFuncionario', cadastroFuncionarioRoutes);
app.use('/cadastroLivro', cadastroLivroRoutes);
app.use('/login', loginRoutes);



// Rota para obter os dados de Funcionários
app.get('/dados/funcionarios', (req, res) => {
  const sql = 'SELECT * FROM Funcionarios';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Clientes
app.get('/dados/clientes', (req, res) => {
  const sql = 'SELECT * FROM Clientes';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Livros
app.get('/dados/livros', (req, res) => {
  const sql = 'SELECT * FROM Livros';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Empréstimos
app.get('/dados/emprestimos', (req, res) => {
  const sql = 'SELECT * FROM Emprestimos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});

// Rota para obter os dados de Reservas
app.get('/dados/reservas', (req, res) => {
  const sql = 'SELECT * FROM Reservas'; // Supondo que a tabela Reservas já exista no banco
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    res.json(results);
  });
});




// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
