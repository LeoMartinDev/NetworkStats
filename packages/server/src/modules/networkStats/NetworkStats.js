const { EventEmitter } = require('events');
const _ = require('lodash');

const runSpeedTest = require('./speedTest.service');
const { formatBandwidthToMbps } = require('./networkStats.model');

const DEFAULT_OPTIONS = {
  interval: 30 * 1000,
};

class NetworkStats extends EventEmitter {
  constructor({ options }) {
    super();

    this.options = _.defaultsDeep(DEFAULT_OPTIONS, options);
  }

  async getNetworkStats() {
    const { download, upload, ping } = await runSpeedTest();
  
    return {
      download: formatBandwidthToMbps({ bandwidth: download.bandwidth }),
      upload: formatBandwidthToMbps({ bandwidth: upload.bandwidth }),
      ping: _.round(ping.latency, 1),
    };
  }

  startMonitoring() {
    const invoke = async () => {
      let download = 0;
      let upload = 0
      let ping = 0;
  
      try {
        ({ download, upload, ping } = await this.getNetworkStats());
      } catch (error) {
        this.emit('warn', 'Failed to get network stats');
      }

      this.emit('data', {
        download,
        upload,
        ping,
      });
  
      setTimeout(invoke.bind(this), this.options.interval);
    };
  
    invoke();
  }
}

module.exports = NetworkStats;
