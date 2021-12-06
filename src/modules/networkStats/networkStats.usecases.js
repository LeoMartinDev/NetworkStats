const NetworkStats = require('./NetworkStats');

module.exports = {
  getStats,
  monitorNetworkStats,
};

function monitorNetworkStats({ options, onData, onWarning }) {
  const stats = new NetworkStats({ options });

  stats.on('data', onData);

  stats.on('warn', onWarning);

  stats.startMonitoring();
}

async function getStats({ networkStatsRepository }) {
  const stats = await networkStatsRepository.find();

  return {
    stats,
    units: {
      ping: 'ms',
      upload: 'mbps',
      download: 'mbps',
    },
  };
}