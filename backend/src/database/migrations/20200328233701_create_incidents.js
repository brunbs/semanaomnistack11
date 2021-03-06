exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); //relacionamento

        table.foreign('ong_id').references('id').inTable('ongs');//sempre que criar um id ele tem que estar criado na ong

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
