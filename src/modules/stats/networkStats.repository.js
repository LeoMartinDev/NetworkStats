const _ = require('lodash');

const formatOneNetworkStat = ({ id, download, upload, ping, created_at }) => ({
  id,
  metrics: {
    download,
    upload,
    ping,
  },
  date: created_at,
});

module.exports = ({ knex }) => ({
  async find() {
    const stats = await knex.select().from('network_stats');
  
    return _.map(stats, formatOneNetworkStat);
  },
  async findOneById({ id }) {
    const stat = await knex.select().from('network_stats').where({ id });
  
    return formatOneNetworkStat(stat);
  },
  async insertOne({ data }) {
    const [id] = await knex.insert(data).into('network_stats', ['id']);
  
    return this.findOneById({ id });
  },
});
