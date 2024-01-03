/*
    Arquivo contendo definição de acesso à database
*/

//credenciais de login
const { pirataDb } = require('../config.json');
//node postgres
const { Pool } = require('pg');

function createUrl() {
    return `postgres://${pirataDb.user}:${pirataDb.password}@${pirataDb.host}:${pirataDb.port}/${pirataDb.database}`
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