const _ = require('lodash');

module.exports = {
  formatBandwidthToMbps,
};

function formatBandwidthToMbps({ bandwidth, precision = 1 }) {
  return _.round(bandwidth / 125000, precision);
}
