
'use strict';

module.exports = appInfo => {
  const config = {};
  config.cluster = {
    listen: {
      port: 80,
    },
  };
  return config;
};
