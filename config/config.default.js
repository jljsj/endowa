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
  config.middleware = [ 'gzip' ];
  config.gzip = {
    threshold: 1024,
  };
  config.keys = appInfo.name + '_1552390167884_854';
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.static = {
    dir: [
      { prefix: '/public/', dir: path.join(appInfo.baseDir, 'app/public'), gzip: true },
      { prefix: '/uploads', dir: path.join(appInfo.baseDir, 'app/uploads'), gzip: true },
    ],
  };

  config.assets = {
    publicPath: '/public',
    devServer: {
      autoPort: true,
      command: 'umi dev --port={port}',
      env: {
        APP_ROOT: path.join(__dirname, '../app/web'),
        BROWSER: 'none',
        SOCKET_SERVER: 'http://localhost:{port}',
      },
      debug: true,
    },
  };

  config.security = {
    csrf: false,
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Jiang4321',
      // 数据库名
      database: 'endowa',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 1000 * 60 * 60 * 8,
    httpOnly: true,
    encrypt: true,
  };

  config.multipart = {
    mode: 'stream',
  };

  return config;
};
