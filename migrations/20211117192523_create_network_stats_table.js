
module.exports = {
  up: async (knex) => {
    const exists = await knex.schema.hasTable('network_stats');

    if (exists) {
      return;
    }

    return knex.schema.createTable('network_stats', (t) => {
      t.increments('id').primary();
      t.float('upload').notNullable();
      t.float('download').notNullable();
      t.float('ping').notNullable();
      t.datetime('created_at').defaultTo(knex.fn.now());
    });
  },
  down: (knex) =>{
    return knex.schema.dropTableIfExists('network_stats');
  },
};
