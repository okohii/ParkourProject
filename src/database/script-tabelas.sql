-- Active: 1713288107577@@127.0.0.1@3306@parkour

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

SELECT * from usuario;