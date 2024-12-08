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
(6, 1, '2024-11-17'),
(4, 3, '2024-11-18');

-- Atualizar dados de clientes
UPDATE Clientes SET Telefone = '444333222' WHERE Nome = 'Lucas Pereira';
UPDATE Clientes SET Senha = 'newpassword2024' WHERE Email = 'isabela.andrade@email.com';

-- Atualizar dados de funcionários
UPDATE Funcionarios SET Cargo = 'Supervisor' WHERE Nome = 'Marcos Souza';
UPDATE Funcionarios SET Telefone = '999111888' WHERE Email = 'juliana.mendes@email.com';

-- Atualizar dados de livros
UPDATE Livros SET Quantidade = Quantidade + 2 WHERE Titulo = '1984';
UPDATE Livros SET Editora = 'Companhia das Letras' WHERE Autor = 'Machado de Assis';

-- Atualizar dados de empréstimos
UPDATE Emprestimos SET DataDevolucao = '2024-12-10' WHERE EmprestimoID = 3;
UPDATE Emprestimos SET DataEmprestimo = '2024-11-12' WHERE LivroID = 5;

-- Atualizar dados de reservas
UPDATE Reservas SET DataReserva = '2024-11-19' WHERE ReservaID = 2;
UPDATE Reservas SET LivroID = 2 WHERE ReservaID = 3;

-- Remover clientes
DELETE FROM Clientes WHERE ClienteID = 4;
DELETE FROM Clientes WHERE Nome = 'Lucas Pereira';

-- Remover funcionários
DELETE FROM Funcionarios WHERE ID = 3;
DELETE FROM Funcionarios WHERE Nome = 'Juliana Mendes';

-- Remover livros
DELETE FROM Livros WHERE LivroID = 5;
DELETE FROM Livros WHERE Titulo = 'A Revolução dos Bichos';

-- Remover empréstimos
DELETE FROM Emprestimos WHERE EmprestimoID = 2;
DELETE FROM Emprestimos WHERE DataDevolucao = '2024-12-05';

-- Remover reservas
DELETE FROM Reservas WHERE ReservaID = 2;
DELETE FROM Reservas WHERE LivroID = 6;

-- 1. Listar todos os empréstimos de clientes com reservas em aberto
SELECT e.*
FROM Emprestimos e
WHERE e.ClienteID IN (
    SELECT r.ClienteID
    FROM Reservas r
    WHERE r.DataReserva > '2024-11-10'
);

-- 2. Buscar títulos de livros emprestados mais de uma vez
SELECT DISTINCT l.Titulo
FROM Livros l
WHERE l.LivroID IN (
    SELECT LivroID 
    FROM Emprestimos 
    GROUP BY LivroID 
    HAVING COUNT(*) > 1
);

-- 3. Mostrar funcionários que têm "Assistente" no cargo
SELECT Nome, Cargo
FROM Funcionarios
WHERE Cargo LIKE '%Assistente%';

-- 4. Encontrar clientes que ainda não devolveram livros
SELECT Nome
FROM Clientes
WHERE ClienteID IN (
    SELECT ClienteID 
    FROM Emprestimos 
    WHERE DataDevolucao IS NULL
);

-- 5. Listar livros reservados que têm menos de 3 unidades disponíveis
SELECT Titulo
FROM Livros
WHERE LivroID IN (
    SELECT LivroID
    FROM Reservas
) AND Quantidade < 3;

-- 1. Encontrar clientes cujo email termina em "@email.com"
SELECT Nome, Email 
FROM Clientes
WHERE Email LIKE '%@email.com';

-- 2. Retornar o domínio do email dos funcionários
SELECT SUBSTRING_INDEX(Email, '@', -1) AS Dominio
FROM Funcionarios;

-- 3. Concatenar nome e cargo dos funcionários
SELECT CONCAT(Nome, ' - ', Cargo) AS Descricao
FROM Funcionarios;

-- 4. Padronizar títulos dos livros com letras maiúsculas
SELECT UPPER(Titulo) AS TituloMaiusculo
FROM Livros;

-- 5. Encontrar funcionários cujo nome começa com "J"
SELECT Nome
FROM Funcionarios
WHERE Nome LIKE 'J%';

-- 1. Contar o número total de livros emprestados por cliente
SELECT ClienteID, COUNT(*) AS TotalEmprestimos
FROM Emprestimos
GROUP BY ClienteID;

-- 2. Exibir o autor com mais livros disponíveis
SELECT Autor, SUM(Quantidade) AS TotalDisponivel
FROM Livros
GROUP BY Autor
ORDER BY TotalDisponivel DESC
LIMIT 1;

-- 3. Mostrar a média de livros emprestados por cliente
SELECT AVG(Total) AS MediaEmprestimos
FROM (
    SELECT COUNT(*) AS Total 
    FROM Emprestimos
    GROUP BY ClienteID
) SubQuery;

-- 4. Listar gêneros de livros com mais de 5 unidades no total
SELECT Genero, SUM(Quantidade) AS TotalUnidades
FROM Livros
GROUP BY Genero
HAVING SUM(Quantidade) > 5;

-- 5. Exibir clientes que possuem mais de 2 reservas
SELECT ClienteID, COUNT(*) AS TotalReservas
FROM Reservas
GROUP BY ClienteID
HAVING COUNT(*) > 2;

-- 1. Ordenar livros por quantidade disponível em ordem decrescente
SELECT Titulo, Quantidade
FROM Livros
ORDER BY Quantidade DESC;

-- 2. Ordenar clientes pelo nome em ordem alfabética
SELECT Nome
FROM Clientes
ORDER BY Nome;

-- 3. Ordenar empréstimos por data de devolução (mais antigos primeiro)
SELECT * 
FROM Emprestimos
ORDER BY DataDevolucao ASC;

-- 4. Ordenar funcionários pelo cargo e, em seguida, pelo nome
SELECT Nome, Cargo
FROM Funcionarios
ORDER BY Cargo, Nome;

-- 5. Ordenar reservas por data e cliente
SELECT * 
FROM Reservas
ORDER BY DataReserva, ClienteID;

