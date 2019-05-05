
'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};
  config.middleware = [ 'gzip' ];
  config.gzip = {
    threshold: 1024,
  };
  config.static = {
    dir: [
      { prefix: '/public/', dir: path.join(appInfo.baseDir, 'app/public'), gzip: true },
      { prefix: '/uploads', dir: path.join(appInfo.baseDir, 'app/uploads'), gzip: true },
    ],
  };
  config.cluster = {
    listen: {
      port: 80,
    },
  };
  return config;
};
