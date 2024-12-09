-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS Biblioteca;
USE Biblioteca;

-- Tabela para armazenar os clientes
CREATE TABLE Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Telefone VARCHAR(15),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL
);

-- Tabela para armazenar os funcionários
CREATE TABLE Funcionarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Telefone VARCHAR(15) NOT NULL,
    Cargo VARCHAR(100) NOT NULL,
    DataAdmissao DATE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL
);

-- Tabela para armazenar os livros
CREATE TABLE Livros (
    LivroID INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(255) UNIQUE NOT NULL,
    Autor VARCHAR(255) NOT NULL,
    Genero VARCHAR(100),
    AnoPublicacao INT,
    Editora VARCHAR(255),
    Quantidade INT NOT NULL
);

-- Tabela para armazenar os empréstimos
CREATE TABLE Emprestimos (
    EmprestimoID INT AUTO_INCREMENT PRIMARY KEY,
    LivroID INT,
    ClienteID INT,
    DataEmprestimo DATE,
    DataDevolucao DATE,
    FOREIGN KEY (LivroID) REFERENCES Livros(LivroID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reservas (
    ReservaID INT AUTO_INCREMENT PRIMARY KEY,
    LivroID INT NOT NULL,
    ClienteID INT NOT NULL,
    DataReserva DATE NOT NULL,
    FOREIGN KEY (LivroID) REFERENCES Livros(LivroID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);