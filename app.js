const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Rota para renderizar a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rota para renderizar a página de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/views/cadastro.html');
});

// Rota para processar o cadastro de funcionários
app.post('/cadastro', async (req, res) => {
  const { nome, telefone, cargo, dataAdmissao, email, senha } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);

  const sql = 'INSERT INTO Funcionarios (Nome, Telefone, Cargo, DataAdmissao, Email, Senha) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, telefone, cargo, dataAdmissao, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Erro no servidor!');
    res.send('<h1>Cadastro realizado com sucesso!</h1><a href="/login">Ir para Login</a>');
  });
});

// Rota para renderizar a página de cadastro de clientes
app.get('/cadastroCliente', (req, res) => {
  res.sendFile(__dirname + '/views/cadastroCliente.html');
});

// Rota para processar o cadastro de clientes
app.post('/cadastroCliente', async (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  // Criptografar a senha do cliente
  const hashedPassword = await bcrypt.hash(senha, 10);

  const sql = 'INSERT INTO Clientes (Nome, Telefone, Email, Senha) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, telefone, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Erro no servidor!');
    res.send('<h1>Cliente cadastrado com sucesso!</h1><a href="/">Voltar ao início</a>');
  });
});

// Rota para renderizar a página de login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM Funcionarios WHERE Email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send('Erro no servidor!');
    if (results.length === 0 || !(await bcrypt.compare(senha, results[0].Senha))) {
      return res.status(401).send('<h1>Email ou senha inválidos!</h1>');
    }
    res.redirect('/menu');
  });
});

// Rota para renderizar a página do menu
app.get('/menu', (req, res) => {
  res.sendFile(__dirname + '/views/menu.html');
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});