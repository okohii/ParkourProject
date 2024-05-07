CREATE DATABASE parkour;

USE parkour;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	emailUsuario VARCHAR(45),
	senhaUsuario VARCHAR(45)
);