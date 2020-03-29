const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await connection('incidents') //vai reetornar um array mas queremos só a primeira posição por isso colocamos ela entre colchetes (a variavel)
            .count();
        
        response.header('X-Total-Count', count['count(*)']); ////o total de incidentes não é pra ser mostrado no corpo da aplicação e sim ficar no cabeçalho da resposta Header. X-Total-Count é o nome que vai ficar armazenado no cabeçalho

        const incidents = await connection ('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //para relacionar os incidents mais dados da tabela de ongs assim retorna dados da ong junto
            .limit(5)
            .offset((page - 1) * 5) //vai mostrar de 5 em cinco
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);
        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //vai pegar o id que estará no cabeçalho . header guarda dados de autenticação ou localização do usuário ou idioma, tudo do contexto da requisição
        const [id] = await connection('incidents').insert({ //vai pegar o primeiro atributo do array e vai armazenar em uma variável chamada id
            title,
            description,
            value,
            ong_id,
        });
    return response.json({ id });
//  const id = result[0]; //pois como foi feito 1 inserção só, a variavel result é um array de uma posição apenas
    },

    async delete(request,response) {
        const { id } = request.params; //vai pegar o id que vem na rota
        const ong_id = request.headers.authorization; //vai pegar o id da ong da rota pra saber se o id do incidente é daquela ong mesmo

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send(); //quando a resposta não tem conteúdo, usamos o status code do http 204
    }
};