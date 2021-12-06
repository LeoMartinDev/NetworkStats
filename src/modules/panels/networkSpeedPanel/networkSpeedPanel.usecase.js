const model = require('./networkSpeedPanel.model');

module.exports = async function getNetworkSpeedPanelData({
  networkStatsRepository,
  periodType,
}) {
  const networkStatsPeriod = model.getNetworkStatsPeriod({ periodType });

  const networkStats = await networkStatsRepository.find({
    ...networkStatsPeriod,
  });

  return model.formatNetworkStats({ networkStats, periodType });
}
