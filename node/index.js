const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};


app.get('/insert/people/:name', (req,res) => {
    let connection = mysql.createConnection(config)
    createTable(connection)
    let sql = `insert into people(nome) values ("${req.params.name}");`
    var response = "<h1>Full Cycle</h1><br/>"
    connection.query(sql);
    connection.end()
    res.send(response)
})

app.get('/', (req,res)=>{
    let connection = mysql.createConnection(config)
    createTable(connection)
    var nomes = "<h1>Full Cycle</h1>"
    let sql = `select * from people;`
    connection.query(sql, function (error, results, fields) {
        if (error) res.send(nomes+"<h3>Ocorreu um erro na busca</h3>");
        if (results.length == 0){
            nomes += `<h4>Sem Registros Cadastrados!!!</h4>
                    <h3> Para adicionar um registro utilize a senguinte URL:</h3>
                    /insert/people/<Nome que deseja cadastrar>
            `
        }
        for (let i = 0; i< results.length; i++){
            nomes +="<h2>"+results[i].nome+"</h2>"
        }
        res.send(nomes)
    });
})

function createTable(connection){
    let sql = `CREATE TABLE IF NOT EXISTS people (
                        id int primary key auto_increment, 
                        nome varchar(255) 
                    );`
    connection.query(sql) 
}

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})