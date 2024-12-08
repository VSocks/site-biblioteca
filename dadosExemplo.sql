-- Inserir dados na tabela Clientes
INSERT INTO Clientes (Nome, Telefone, Email, Senha)
VALUES 
('Ana Silva', '123456789', 'ana.silva@email.com', 'hunter2'),
('João Santos', '987654321', 'joao.santos@email.com', 'amoPizza85#'),
('Maria Oliveira', '111222333', 'maria.oliveira@email.com', '147258369');

-- Inserir dados na tabela Funcionarios
INSERT INTO Funcionarios (Nome, Cargo, Telefone, Email, Senha, DataAdmissao)
VALUES 
('Carlos Lima', 'Bibliotecário', '555444333', 'carlos.lima@email.com', 'carlos1234', '2015-03-01'),
('Fernanda Costa', 'Assistente', '444333222', 'fernanda.costa@email.com', 'Fernanda18!', '2018-07-15');

-- Inserir dados na tabela Livros
INSERT INTO Livros (Titulo, Autor, Genero, AnoPublicacao, Editora, Quantidade)
VALUES 
('Dom Quixote', 'Miguel de Cervantes', 'Ficção', 1605, 'Francisco de Robles', 5),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 1954, 'Allen & Unwin', 3),
('1984', 'George Orwell', 'Distopia', 1949, 'Secker & Warburg', 4),
('Orgulho e Preconceito', 'Jane Austen', 'Romance', 1813, 'T. Egerton', 2);

-- Inserir dados na tabela Emprestimos
INSERT INTO Emprestimos (LivroID, ClienteID, DataEmprestimo, DataDevolucao)
VALUES 
(1, 1, '2024-11-01', '2024-11-15'),
(2, 2, '2024-11-05', '2024-11-20'),
(3, 1, '2024-11-10', NULL); -- Livro ainda não devolvido

-- Inserir dados na tabela Reservas
INSERT INTO Reservas (LivroID, ClienteID, DataReserva)
VALUES
(2, 1, '2024-11-12');

-- Atualizar o telefone de um cliente
UPDATE Clientes SET Telefone = '999888777' WHERE ClienteID = 1;

-- Atualizar o número de livros disponíveis
UPDATE Livros SET Quantidade = Quantidade - 1 WHERE LivroID = 1 AND Quantidade > 0;

-- Atualizar a data de devolução de um empréstimo
UPDATE Emprestimos SET DataDevolucao = '2024-11-20' WHERE EmprestimoID = 1;

-- Atualizar o cargo de um funcionário
UPDATE Funcionarios SET Cargo = 'Gerente' WHERE ID = 1;

-- Remover uma reserva
DELETE FROM Reservas WHERE ReservaID = 1;

-- Remover um empréstimo
DELETE FROM Emprestimos WHERE EmprestimoID = 1;

-- Remover um livro
DELETE FROM Livros WHERE LivroID = 4;
