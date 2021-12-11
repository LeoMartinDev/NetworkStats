const path = require('path');
const fs = require('fs');
const fastify = require('fastify');
const pino = require('pino');
const pinoPretty = require('pino-pretty');

const config = require('../config');
const database = require('./database');
const routes = require('./routes');

const LOGS_FILE_PATH = path.resolve(__dirname, '../../../data/logs.out');

const loggerLevel = config.get('logger.level');

const logger = pino({
  level: loggerLevel,
}, pino.multistream([
  { level: loggerLevel, stream: fs.createWriteStream(LOGS_FILE_PATH) },
  { level: loggerLevel, stream: pinoPretty() },
]))

const instance = fastify({
  logger
});

instance.log.info(config.getProperties(), 'Using following configuration');

instance.register(database);

instance.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    await instance.listen(3000)
  } catch (err) {
    console.log(err)
    instance.log.error(err)
    process.exit(1)
  }
}

start()