const config = require('../../../config');

const getNetworkStatsRepository = require('./networkStats.repository');
const { monitorNetworkStats, getStats } = require('./stats.usecases'); 

module.exports = async (instance) => {
  const networkStatsRepository = getNetworkStatsRepository({ knex: instance.knex });

  // monitorNetworkStats({
  //   options: {
  //     interval: config.get('monitoring.interval'),
  //   },
  //   onData: (data) => {
  //     instance.log.debug(data, 'New network stats');
  //     networkStatsRepository.insertOne({ data });
  //   },
  //   onWarning: instance.log.warn,
  // });

  instance.route(getStatsRoute({ instance, networkStatsRepository }));
};

function getStatsRoute({ networkStatsRepository }) {
  return {
    method: 'GET',
    url: '/',
    handler: async () => {
      return getStats({ networkStatsRepository });
    },
  };
}
