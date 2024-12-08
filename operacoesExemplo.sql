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

-- 1. União entre clientes que fizeram reservas e clientes que pegaram empréstimos
SELECT ClienteID FROM Reservas
UNION
SELECT ClienteID FROM Emprestimos;

-- 2. Interseção de clientes que têm reservas e empréstimos simultaneamente
SELECT ClienteID FROM Reservas
INTERSECT
SELECT ClienteID FROM Emprestimos;

-- 3. Diferença entre livros emprestados e livros reservados
SELECT LivroID FROM Emprestimos
EXCEPT
SELECT LivroID FROM Reservas;

-- 4. União de autores de livros emprestados e reservados
SELECT DISTINCT Autor 
FROM Livros 
WHERE LivroID IN (SELECT LivroID FROM Emprestimos)
UNION
SELECT DISTINCT Autor 
FROM Livros 
WHERE LivroID IN (SELECT LivroID FROM Reservas);

-- 5. Interseção de livros emprestados e livros disponíveis para reserva
SELECT LivroID FROM Emprestimos
INTERSECT
SELECT LivroID FROM Livros WHERE Quantidade > 0;

-- 1. Listar reservas com dados de clientes e livros
SELECT r.DataReserva, c.Nome AS Cliente, l.Titulo AS Livro
FROM Reservas r
JOIN Clientes c ON r.ClienteID = c.ClienteID
JOIN Livros l ON r.LivroID = l.LivroID;

-- 2. Mostrar funcionários que possuem empréstimos associados
SELECT DISTINCT f.Nome AS Funcionario, e.DataEmprestimo
FROM Funcionarios f
JOIN Emprestimos e ON f.ID = e.ClienteID;

-- 3. Listar autores de livros emprestados
SELECT DISTINCT l.Autor
FROM Livros l
JOIN Emprestimos e ON l.LivroID = e.LivroID;

-- 4. Obter todos os empréstimos com dados do cliente e do livro
SELECT e.DataEmprestimo, c.Nome AS Cliente, l.Titulo AS Livro
FROM Emprestimos e
JOIN Clientes c ON e.ClienteID = c.ClienteID
JOIN Livros l ON e.LivroID = l.LivroID;

-- 5. Listar títulos de livros reservados e seus autores
SELECT l.Titulo, l.Autor
FROM Reservas r
JOIN Livros l ON r.LivroID = l.LivroID;

-- 1. Encontrar livros com quantidade maior que qualquer um dos livros reservados
SELECT Titulo 
FROM Livros 
WHERE Quantidade > ANY (
    SELECT Quantidade 
    FROM Livros 
    WHERE LivroID IN (SELECT LivroID FROM Reservas)
);

-- 2. Listar funcionários que não têm cargos iguais a qualquer outro funcionário
SELECT Nome 
FROM Funcionarios
WHERE Cargo <> ALL (
    SELECT Cargo
    FROM Funcionarios
);

-- 3. Encontrar clientes com reservas posteriores a qualquer data de empréstimo
SELECT Nome 
FROM Clientes
WHERE ClienteID IN (
    SELECT ClienteID 
    FROM Reservas 
    WHERE DataReserva > ANY (SELECT DataEmprestimo FROM Emprestimos)
);

-- 4. Exibir livros com quantidade maior que a de todos os livros emprestados
SELECT Titulo
FROM Livros
WHERE Quantidade > ALL (
    SELECT Quantidade 
    FROM Livros 
    WHERE LivroID IN (SELECT LivroID FROM Emprestimos)
);

-- 5. Mostrar reservas feitas antes de todas as datas de devolução
SELECT * 
FROM Reservas
WHERE DataReserva < ALL (SELECT DataDevolucao FROM Emprestimos);

-- 1. Encontrar clientes que possuem reservas
SELECT Nome 
FROM Clientes c
WHERE EXISTS (
    SELECT 1
    FROM Reservas r
    WHERE r.ClienteID = c.ClienteID
);

-- 2. Verificar se existem livros com menos de 2 unidades disponíveis
SELECT 'Existem livros com menos de 2 unidades' AS Resultado
WHERE EXISTS (
    SELECT 1
    FROM Livros
    WHERE Quantidade < 2
);

-- 3. Listar funcionários que registraram empréstimos
SELECT Nome 
FROM Funcionarios f
WHERE EXISTS (
    SELECT 1 
    FROM Emprestimos e
    WHERE e.ClienteID = f.ID
);

-- 4. Mostrar livros emprestados que não foram devolvidos
SELECT Titulo 
FROM Livros l
WHERE EXISTS (
    SELECT 1 
    FROM Emprestimos e
    WHERE e.LivroID = l.LivroID AND e.DataDevolucao IS NULL
);

-- 5. Encontrar clientes com reservas feitas após 2024-11-10
SELECT Nome
FROM Clientes c
WHERE EXISTS (
    SELECT 1
    FROM Reservas r
    WHERE r.ClienteID = c.ClienteID AND r.DataReserva > '2024-11-10'
);
