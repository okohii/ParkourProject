var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, emailUsuario FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function votar(id, voto) {
    console.log('Acessei Votar');

    var instrucaoSql = `
        UPDATE usuario SET fkModalidade = ${voto} WHERE idUsuario = ${id};`
        return database.executar(instrucaoSql);
}

function selectClassic(fkModalidade) {
    console.log('Acessei selectClassic');
    var instrucaoSql = `
        SELECT COUNT(fkModalidade) FROM usuario WHERE fkModalidade = 1;`
        return database.executar(instrucaoSql);
}

function selectFreeRunning(fkModalidade) {
    console.log('Acessei selectFreeRunning');
    var instrucaoSql = `
        SELECT COUNT(fkModalidade) FROM usuario WHERE fkModalidade = 2;`
        return database.executar(instrucaoSql);
}

function selectClimbing(fkModalidade) {
    console.log('Acessei selectClimbing');
    var instrucaoSql = `
        SELECT COUNT(fkModalidade) FROM usuario WHERE fkModalidade = 3;`
        return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    votar,
    selectClassic,
    selectFreeRunning,
    selectClimbing
};