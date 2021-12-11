require('dotenv').config({ path: '../../../.env' });

const convict = require('convict');

const LOGGER_LEVELS = Object.keys(require('pino')()?.levels?.values);

convict.addFormat(require('convict-format-with-validator').ipaddress);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  logger: {
    level: {
      doc: 'The minimum logger level to be logged',
      format: LOGGER_LEVELS,
      default: 'debug',
      env: 'LOGGER_LEVEL',
    },
  },
  monitoring: {
    interval: {
      doc: 'The time between two speedtests in milliseconds.',
      format: Number,
      default: 30000, // 30 seconds
      env: 'MONITORING_INTERVAL',
    },
  },
  database: {
    type: {
      default: 'sqlite',
      doc: 'The database type.',
      format: ['mysql', 'postgresql', 'sqlite'],
      env: 'DATABASE_TYPE',
    },
    host: {
      format: 'ipaddress',
      env: 'DATABASE_HOST',
    },
    port: {
      format: 'port',
      env: 'DATABASE_PORT',
    },
    user: {
      env: 'DATABASE_USER',
      format: '*',
    },
    password: {
      env: 'DATABASE_PASSWORD',
      format: '*',
      sensitive: true,
    },
    database: {
      default: 'network_stats',
      env: 'DATABASE_NAME',
      format: '*',
    },
  },
});

config.validate({ allowed: 'strict' });

module.exports = config;