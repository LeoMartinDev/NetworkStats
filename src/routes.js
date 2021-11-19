const statsRoute = require('./modules/stats/stats.routes');

module.exports = async (instance) => {
  instance.register(statsRoute, { prefix: '/stats' });
}
