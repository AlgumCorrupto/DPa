/*
    Arquivo contendo definição de acesso à database
*/

//credenciais de login
const { fronteira } = require('../config.json');
//node postgres
const { Pool } = require('pg');

function createUrl() {
    return `postgres://${fronteira.user}:${fronteira.password}@${fronteira.host}:${fronteira.port}/${fronteira.database}`
}
const pool = new Pool({
    connectionString: createUrl()
});
pool.on('connect', () =>{
    console.log('base de dados conectada');
})

module.exports = {
    //função de query 
    /*
        Exemplo:
        query("SELECT * FROM $1", tabela) -> SELECT * FROM tabela
    */
    query: (text, params) => pool.query(text, params)
}