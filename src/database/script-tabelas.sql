-- Active: 1715934497580@@localhost@3307

CREATE DATABASE parkour;

USE parkour;

CREATE TABLE modalidade (
	idModalidade INT PRIMARY KEY AUTO_INCREMENT,
	modalidade VARCHAR(45)
);

INSERT INTO modalidade (modalidade) VALUES
	('Classic'),
	('Free Running'),
	('Climbing');

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	emailUsuario VARCHAR(45) UNIQUE,
	senhaUsuario VARCHAR(45)
);

INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario) VALUES
	('Gustavo', 'gustavo@gmail.com', '123456789');

CREATE TABLE voto (
	idVoto INT,
	fkUsuario INT, CONSTRAINT fkUsuarioVoto FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
	fkModalidade INT, CONSTRAINT fkModalidadeVoto FOREIGN KEY (fkModalidade) REFERENCES modalidade(idModalidade),
  PRIMARY KEY (idVoto, fkUsuario, fkModalidade)
);

SELECT * FROM usuario;
SELECT * FROM modalidade;

SELECT * FROM voto;

SELECT COUNT(*) FROM voto WHERE fkModalidade = 1;
SELECT COUNT(*) FROM voto WHERE fkModalidade = 2;
SELECT COUNT(*) FROM voto WHERE fkModalidade = 3;