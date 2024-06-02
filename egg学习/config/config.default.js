/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1717251713169_6146';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.bodyParser = {
    jsonLimit: '20mb',
    formLimit: '20mb',
    textLimit: '20mb',
  };
  // 默认开启安全插件 egg-security,默认true
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      host: '127.0.0.1',
      post: '3306',
      user: 'admin',
      password: '000000',
      database: 'test',
    },
    app: true,
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};
