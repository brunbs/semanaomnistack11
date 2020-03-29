const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
         // o parametro request guarda todas as informações do usuário; o response retorna uma resposta pro usuário
    //return response.send('Hello World'); //responde uma mensagem quando solicitado
    const { name, email, whatsapp, city, uf } = request.body;

    //vamos criar uma id para a ong
    const id = crypto.randomBytes(4).toString('HEX'); //cria 4 caracteres aleatórios para gerar um id e transforma em string
    
    await connection('ongs').insert({ //quando chegar nesse código vai finalizar o código para depois continuar
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id }); //vamos retornar pra ong o ID pra ela saber como se conectar na aplicação
    }
};