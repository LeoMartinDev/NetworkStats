const panelsRoutes = require('./modules/panels/panels.routes');

module.exports = async (instance) => {
  instance.register(panelsRoutes, { prefix: '/panels' });
}
