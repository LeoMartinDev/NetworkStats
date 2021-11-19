const NetworkStats = require('./NetworkStats');

module.exports = {
  getStats,
  monitorNetworkStats,
};

function monitorNetworkStats({ options, onData, logger }) {
  const networkStats = new NetworkStats({ options });

  networkStats.on('data', onData);

  networkStats.on('warn', logger.warn);

  networkStats.startMonitoring();
}

async function getStats({ networkStatsRepository }) {
  const stats = await networkStatsRepository.find();

  return stats;
}