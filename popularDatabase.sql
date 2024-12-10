-- Preenchendo a tabela Clientes
INSERT INTO Clientes (Nome, Telefone, Email, Senha)
VALUES
('Ana Silva', '11999999999', 'ana.silva@gmail.com', 'senha123'),
('Carlos Souza', '21988888888', 'carlos.souza@gmail.com', 'senha456'),
('Mariana Lima', '31977777777', 'mariana.lima@gmail.com', 'senha789'),
('Pedro Almeida', '41966666666', 'pedro.almeida@gmail.com', 'senha101'),
('Fernanda Costa', '51955555555', 'fernanda.costa@gmail.com', 'senha202'),
('João Ferreira', '61944444444', 'joao.ferreira@gmail.com', 'senha303'),
('Camila Ramos', '71933333333', 'camila.ramos@gmail.com', 'senha404'),
('Rafael Oliveira', '81922222222', 'rafael.oliveira@gmail.com', 'senha505'),
('Beatriz Santos', '91911111111', 'beatriz.santos@gmail.com', 'senha606'),
('Gabriel Machado', '11900000000', 'gabriel.machado@gmail.com', 'senha707');

-- Preenchendo a tabela Funcionarios
INSERT INTO Funcionarios (Nome, Telefone, Cargo, DataAdmissao, Email, Senha)
VALUES
('Luis Cardoso', '21911111111', 'Gerente', '2020-01-15', 'luis.cardoso@gmail.com', 'admin123'),
('Paula Mendes', '31922222222', 'Bibliotecária', '2019-05-20', 'paula.mendes@gmail.com', 'lib123'),
('Diego Nunes', '41933333333', 'Atendente', '2021-03-10', 'diego.nunes@gmail.com', 'att123'),
('Juliana Rocha', '51944444444', 'Bibliotecária', '2018-07-25', 'juliana.rocha@gmail.com', 'lib456'),
('Ricardo Alves', '61955555555', 'Gerente', '2020-10-01', 'ricardo.alves@gmail.com', 'admin456'),
('Vanessa Ribeiro', '71966666666', 'Atendente', '2021-11-15', 'vanessa.ribeiro@gmail.com', 'att789'),
('Thiago Santos', '81977777777', 'Assistente', '2019-12-05', 'thiago.santos@gmail.com', 'assist123'),
('Larissa Gonçalves', '91988888888', 'Assistente', '2022-02-20', 'larissa.goncalves@gmail.com', 'assist456'),
('Eduardo Lima', '11999999999', 'Bibliotecário', '2017-06-30', 'eduardo.lima@gmail.com', 'lib789'),
('Renata Azevedo', '21900000000', 'Atendente', '2023-01-10', 'renata.azevedo@gmail.com', 'att101');

-- Preenchendo a tabela Livros
INSERT INTO Livros (Titulo, Autor, Genero, AnoPublicacao, Editora, Quantidade)
VALUES
('Dom Quixote', 'Miguel de Cervantes', 'Ficção', 1605, 'Planeta', 5),
('1984', 'George Orwell', 'Distopia', 1949, 'Companhia das Letras', 8),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Infantil', 1943, 'Agir', 10),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 1954, 'HarperCollins', 4),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Fantasia', 1997, 'Rocco', 6),
('A Revolução dos Bichos', 'George Orwell', 'Fábula', 1945, 'Companhia das Letras', 7),
('O Alquimista', 'Paulo Coelho', 'Ficção', 1988, 'HarperOne', 9),
('Orgulho e Preconceito', 'Jane Austen', 'Romance', 1813, 'Penguin', 3),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Ficção', 1967, 'Record', 8),
('Moby Dick', 'Herman Melville', 'Aventura', 1851, 'Penguin', 2);

-- Preenchendo a tabela Emprestimos
INSERT INTO Emprestimos (LivroID, ClienteID, DataEmprestimo, DataDevolucao)
VALUES
(1, 4, '2024-01-05', '2024-01-15'),
(9, 2, '2024-02-10', '2024-02-20'),
(1, 3, '2024-03-15', '2024-03-25'),
(4, 7, '2024-04-10', '2024-04-20'),
(5, 2, '2024-05-01', '2024-05-11'),
(3, 6, '2024-06-20', '2024-06-30'),
(5, 7, '2024-07-05', '2024-07-15'),
(8, 3, '2024-08-12', '2024-08-22'),
(6, 9, '2024-09-30', '2024-10-10'),
(2, 5, '2024-10-15', '2024-10-25');

-- Preenchendo a tabela Reservas
INSERT INTO Reservas (LivroID, ClienteID, DataReserva)
VALUES
(1, 2, '2024-01-10'),
(2, 3, '2024-02-15'),
(3, 4, '2024-03-20'),
(4, 5, '2024-04-25'),
(5, 6, '2024-05-30'),
(6, 7, '2024-06-10'),
(7, 8, '2024-07-15'),
(8, 9, '2024-08-20'),
(9, 10, '2024-09-25'),
(10, 1, '2024-10-30');