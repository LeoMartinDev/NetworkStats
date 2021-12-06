const util = require('util');
const _ = require('lodash');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const promiseRetry = require('promise-retry');

module.exports = runSpeedTest;

async function runSpeedTest() {
  const invoke = async () => {
    const { stdout, stderr } = await exec(`speedtest --format=json`, { shell: '/bin/bash' });

    if (stderr) throw new Error(stderr);
  
    return JSON.parse(stdout);
  };

  return promiseRetry((retry) => invoke().catch(retry), { retries: 2, minTimeout: 500 });
}
