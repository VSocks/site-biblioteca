const express = require('express');
const bodyParser = require('body-parser');
const cadastroRoutes = require('./routes/cadastro');
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
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});