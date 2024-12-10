const express = require('express');
const bodyParser = require('body-parser');
const cadastroClienteRoutes = require('./routes/cadastroCliente');
const cadastroFuncionarioRoutes = require('./routes/cadastroFuncionario');
const cadastroLivroRoutes = require('./routes/cadastroLivro');
const emprestimoRouter = require('./routes/emprestimo');
const reservaRouter = require('./routes/reserva');
const loginRoutes = require('./routes/login');
const menuRoutes = require('./routes/menu');
const devolucaoRoutes = require('./routes/devolucao');
const db = require('./database');

const app = express();
app.use(express.static('public'));
app.use(express.json());
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
app.use('/cadastroCliente', cadastroClienteRoutes);
app.use('/cadastroFuncionario', cadastroFuncionarioRoutes);
app.use('/cadastroLivro', cadastroLivroRoutes);
app.use('/emprestimo', emprestimoRouter);
app.use('/reserva', reservaRouter);
app.use('/login', loginRoutes);
app.use('/devolucao', devolucaoRoutes);
app.use(menuRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});