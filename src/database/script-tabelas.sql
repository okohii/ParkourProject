-- Active: 1713288107577@@127.0.0.1@3306@parkour

CREATE DATABASE parkour;

USE parkour;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	emailUsuario VARCHAR(45) UNIQUE,
	senhaUsuario VARCHAR(45)
);

SELECT * from usuario;

select idUsuario, nomeUsuario, senhaUsuario from usuario where emailUsuario = 'gustavo@gmail.com';

