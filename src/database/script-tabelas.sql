
CREATE DATABASE parkour;

USE parkour;

CREATE TABLE modalidade (
	idModalidade INT PRIMARY KEY AUTO_INCREMENT,
	modalidade VARCHAR(45)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	emailUsuario VARCHAR(45) UNIQUE,
	senhaUsuario VARCHAR(45),
	fkModalidade int, constraint fkMod FOREIGN KEY (fkModalidade) REFERENCES modalidade(idModalidade)
);

INSERT INTO modalidade (modalidade) VALUES
	('Classic'),
	('Free Running'),
	('Climbing');

SELECT * from usuario;
SELECT * from modalidade;

SELECT COUNT(*) FROM usuario WHERE fkModalidade = 1;
SELECT COUNT(*) FROM usuario WHERE fkModalidade = 2;
SELECT COUNT(*) FROM usuario WHERE fkModalidade = 3;
