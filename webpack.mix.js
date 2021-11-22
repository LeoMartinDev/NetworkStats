
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const path = require('path');
const mix = require('laravel-mix');
require('laravel-mix-handlebars');

const CLIENT_PATH = './client';
const PUBLIC_PATH = './public';

const options = {
  hmr: {
    host: 'localhost',
    port: '8083'
  },
};

mix.options({
  hmrOptions: options.hmr,
});

mix
  .js(path.join(CLIENT_PATH, 'index.js'), 'js')
  .react()
  .handlebars(CLIENT_PATH, PUBLIC_PATH, {
    isProduction: IS_PRODUCTION,
    baseURL: IS_PRODUCTION ? '' : `http://${options.hmr.host}:${options.hmr.port}`
  })
  .extract(['react'])
  .setPublicPath(PUBLIC_PATH)
  .disableNotifications()
  .disableSuccessNotifications();

if (mix.inProduction()) {
  mix.version();
  mix.after((stats) => {
    stats.compilation.assets = {}
  });
}