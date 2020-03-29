//PÁGINA INICIAL

const express = require('express') //importando as funcionalidades do express

const cors = require('cors'); //importa o módulo de segurança

const app = express(); //variavel que armazena a aplicação

const routes = require('./routes'); //tem que botar ./ pq é um arquivo e não uma rota

app.use(cors());
/* depois de pronta a aplicação, vamos mudar esse comando do app.use(cors) para que ele use a página que a aplicação está hospedada, ficando assim:
app.use(cors({
   origin: 'http://meuapp.com
}))*/

app.use(express.json()); //estou dizendo para converter o json em algo entendível pela aplicação . javascript

app.use(routes);

//Rota seria a "página" que aqui está em '/' se fosse na pagina users pra retornar lista de usuarios seria /users. Já o recursos seria algum recurso que queremos buscar dentro da aplicação como por exemplo uma lista dentro de um banco de dados
//app.get acessa uma rota pelo método app.get
/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do backend que dará um retorno (uma lista, dado de um usuário)
 * POST: Criar uma informação no backend (envia informações para criar um usuário)
 * PUT: Alterar uma informação no backend
 * DELETE: Deletar uma informação no backend
 */
//quando abrimos uma página o navegador usa um método GET

/**
 * TIPOS DE PARÂMETROS
 * 
 * Query params: parâmetros nomeados enviados na rota após "?" podemos concatenar com "&" (filtros, paginação) ex: /users?nome=Bruno ou nome=Bruno&pagina=2
 * Route params: parâmetros utilizados para identificar recursos. Ex: no get('/users:id') para recuperar um usuário. aí na rota do insomnia ou do navegador coloca /users/1 por exemplo para trazer o usuário que tenha a id 1
 * Request Body: é o corpo da requisição. Utilizado para criar ou alterar recursos. Imagina que estou criando um usuário, preciso informar informações do usuário.
 */

 /**
  * SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL Server
  * noSQL: MongoDB, CouchDB, etc
  */

  /**
   * Driver do banco de dados: SELECT * FROM users
   * Query Builder: table('users').select('*').where() --> esse utiliza javascript pra montar a busca; é esse que vamos usar que é o KNEX.js
   */


app.listen(3333);