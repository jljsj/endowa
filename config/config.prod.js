
'use strict';

module.exports = appInfo => {
  const config = {};
  config.cluster = {
    listen: {
      port: 8080,
    },
  };
  return config;
};
