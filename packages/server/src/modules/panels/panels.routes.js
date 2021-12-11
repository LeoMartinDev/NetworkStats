const _ = require('lodash');

const config = require('../../../config');

const { PERIOD_TYPES, DEFAULT_PERIOD_TYPE } = require('./networkSpeedPanel/networkSpeedPanel.constants');
const getNetworkStatsRepository = require('../networkStats/networkStats.repository');
const { monitorNetworkStats } = require('../networkStats/networkStats.usecases'); 

const getNetworkSpeedPanelData = require('./networkSpeedPanel/networkSpeedPanel.usecase');

module.exports = async (instance) => {
  const networkStatsRepository = getNetworkStatsRepository({ knex: instance.knex });

  monitorNetworkStats({
    options: {
      interval: config.get('monitoring.interval'),
    },
    onData: (data) => {
      instance.log.debug(data, 'New network stats');
      networkStatsRepository.insertOne({ data });
    },
    onWarning: instance.log.warn,
  });

  instance.route(getSpeedsPanelRoute({ instance, networkStatsRepository }));
  // instance.route(getAveragePanelRoute({ instance, networkStatsRepository }));
};

function getSpeedsPanelRoute({ networkStatsRepository }) {
  return {
    method: 'GET',
    url: '/network-speed',
    schema: {
      querystring: {
        periodType: { type: 'string', enum: _.values(PERIOD_TYPES), default: DEFAULT_PERIOD_TYPE },
      },
    },
    handler: async (request) => {
      const { query } = request;
      const { periodType } = query;

      return getNetworkSpeedPanelData({ networkStatsRepository, periodType });
    },
  };
}

// function getAveragePanelRoute({ networkStatsRepository }) {
//   return {
//     method: 'GET',
//     url: '/average',
//     handler: async () => {
//       return getStats({ networkStatsRepository });
//     },
//   };
// }
