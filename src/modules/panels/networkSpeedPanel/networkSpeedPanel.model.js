const dayjs = require('dayjs');
const _ = require('lodash');

const { METRICS } = require('../../networkStats/networkStats.constants');
const { PERIOD_TYPES, DEFAULT_PERIOD_TYPE } = require('./networkSpeedPanel.constants');

dayjs.extend(require('dayjs/plugin/utc'));

module.exports = {
  getNetworkStatsPeriod,
  getNetworkStatsByPeriod,
  formatNetworkStats,
};

function getNetworkStatsPeriod({ periodType, now = new Date() }) {
  const periodTypeToStartDate = {
    [PERIOD_TYPES.HOUR]: dayjs(now).utc().subtract(1, 'hour').toDate(),
    [PERIOD_TYPES.DAY]: dayjs(now).utc().subtract(1, 'day').toDate(),
    [PERIOD_TYPES.WEEK]: dayjs(now).utc().subtract(1, 'week').toDate(),
  };

  const startDate = periodTypeToStartDate[periodType] || periodTypeToStartDate[DEFAULT_PERIOD_TYPE];

  return {
    startDate,
    endDate: now,
  };
}

function getNetworkStatsByPeriod({ networkStats, periodType }) {
  const periodTypeGroupFn = {
    [PERIOD_TYPES.HOUR]: ({ date }) => dayjs(date).utc().format('YYYY-MM-DD HH:mm'),
    [PERIOD_TYPES.DAY]: ({ date }) => dayjs(date).utc().format('YYYY-MM-DD HH'),
    [PERIOD_TYPES.WEEK]: ({ date }) => `${dayjs(date).utc().format('YYYY-MM-DD')}}`,
  };

  const groupFn = periodTypeGroupFn[periodType] || periodTypeGroupFn[DEFAULT_PERIOD_TYPE];

  return _.groupBy(networkStats, groupFn);
}

function getPerMetricNetworkStats({ networkStatsByPeriod }) {
  return _.chain(networkStatsByPeriod)
    .map((networkStats, period) =>
      _.map(networkStats, ({ metrics }) =>
        _.map(metrics, (value, metric) => ({
          value,
          metric,
        })),
    ))
    .flattenDeep()
    .groupBy('metric')
    .mapValues((networkStats) => _.map(networkStats, 'value'))
    .value();
}

function getPeriodsLabels({ networkStatsByPeriod, periodType }) {
  const periodTextFormatFn = {
    [PERIOD_TYPES.HOUR]: (period) => dayjs(period, 'YYYY-MM-DD HH:mm').utc().format('HH:mm'),
    [PERIOD_TYPES.DAY]: (period) => dayjs(period, 'YYYY-MM-DD HH').utc().format('MM-DD HH:mm'),
    [PERIOD_TYPES.WEEK]: (period) => dayjs(period, 'YYYY-MM-DD').utc().format('MM-DD'),
  };

  const textFormatFn = periodTextFormatFn[periodType] || periodTextFormatFn[DEFAULT_PERIOD_TYPE];

  const periods = _.keys(networkStatsByPeriod);

  return _.map(periods, textFormatFn);
}

function getMetricsLabels({ metrics }) {
  const UNITS = {
    ping: 'ms',
    upload: 'mbps',
    download: 'mbps',
  };

  return _.chain(metrics)
    .map((metric) => ({ metric, label: `${_.capitalize(metric)} (${UNITS[metric]})` }))
    .keyBy('metric')
    .mapValues('label')
    .value();
}

function formatNetworkStats({ networkStats, periodType = DEFAULT_PERIOD_TYPE }) {
  const networkStatsByPeriod = getNetworkStatsByPeriod({ networkStats, periodType });

  const perMetricNetworkStats = getPerMetricNetworkStats({ networkStatsByPeriod });
  const metrics = METRICS;
  const metricsLabels = getMetricsLabels({ metrics });
  const periods = getPeriodsLabels({ networkStatsByPeriod, periodType });
  const periodTypes = _.values(PERIOD_TYPES);

  return {
    metrics,
    metricsLabels,
    periods,
    periodType,
    periodTypes,
    data: perMetricNetworkStats,
  };
}
