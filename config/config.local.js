/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.middleware = null;

  config.static = {
    dir: [
      { prefix: '/public/', dir: path.join(appInfo.baseDir, 'app/public') },
      { prefix: '/uploads', dir: path.join(appInfo.baseDir, 'app/uploads') },
    ],
  };

  return config;
};
