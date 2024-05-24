var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log("Recebido no servidor: ", {nome, email, senha}); // Adicione logs

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function votar(req, res) {
    var id = req.body.idServer;
    var voto = req.body.votoServer;

    if (id == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (voto == undefined) {
        res.status(400).send("O voto está undefined!");
    } else {
        usuarioModel.votar(id, voto)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log('resultado: ', resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o voto! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function selectClassic(req, res) {
    usuarioModel.selectClassic()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Houve um erro ao buscar os votos! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function selectFreeRunning(req, res) {
    usuarioModel.selectFreeRunning()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Houve um erro ao buscar os votos! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function selectClimbing(req, res) {
    usuarioModel.selectClimbing()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Houve um erro ao buscar os votos! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    votar,
    selectClassic,
    selectFreeRunning,
    selectClimbing
}