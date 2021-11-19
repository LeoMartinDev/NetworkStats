const _ = require('lodash');
const path = require('path');
const plugin = require('fastify-plugin');

const config = require('../config');

const SQLITE_FILE_PATH = path.resolve(__dirname, '../data/db.sqlite');
const MIGRATIONS_PATH = path.resolve(__dirname, '../migrations');

const DATABASES_CLIENTS = {
  sqlite: 'sqlite3',
  postgresql: 'pg',
  mysql: 'mysql',
};

function getDatabaseConfig({ database }) {
  const config = {
    client: DATABASES_CLIENTS[database.type],
    connection: _.pick(database, ['host', 'port', 'user', 'password', 'database']),
    useNullAsDefault: true,
  };

  if (database.type !== 'sqlite') {
    return config;
  }

  return {
    ...config,
    connection: {
      filename: SQLITE_FILE_PATH,
    },
  };
}

module.exports = plugin(async (instance) => {
  const databaseConfig = getDatabaseConfig({ database: config.get('database') });

  await instance.register(require('fastify-knexjs'), databaseConfig, (error) =>
    instance.log.error(error)
  );

  await instance.knex.migrate.latest({
    directory: MIGRATIONS_PATH,
  });
});