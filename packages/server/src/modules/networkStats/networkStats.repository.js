const dayjs = require('dayjs');
const _ = require('lodash');

dayjs.extend(require('dayjs/plugin/utc'));

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const formatOneNetworkStat = ({ id, download, upload, ping, created_at }) => ({
  id,
  metrics: {
    download,
    upload,
    ping,
  },
  date: created_at,
});

module.exports = ({ knex }) => {
  const NetworkStats = () => knex('network_stats');

  return {
    async find({ startDate, endDate } = {}) {
      const query = NetworkStats();

      if (startDate) {
        query.where('created_at', '>', dayjs(startDate).utc().format(DATE_FORMAT));
      }
  
      if (endDate) {
        query.where('created_at', '<', dayjs(endDate).utc().format(DATE_FORMAT));
      }

      const networkStats = await query;
  
      return _.map(networkStats, formatOneNetworkStat);
    },
    async findOneById({ id }) {
      const networkStat = await NetworkStats().select().where({ id }).first();
    
      return formatOneNetworkStat(networkStat);
    },
    async insertOne({ data }) {
      const [id] = await knex.insert(data).into('network_stats', ['id']);
    
      return this.findOneById({ id });
    },
  };
};
