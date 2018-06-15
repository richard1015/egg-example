'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526196903846_6533';
  //请求参数 body 限制
  config.bodyParser = {
    jsonLimit: '10mb',
  },
    // add your config here
    config.middleware = [];
  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  // 添加 news 的配置项
  config.readhub = {
    serverUrl: 'https://api.readhub.me/',
  };
  // add middleware robot
  config.middleware = [
    'robot'
  ];
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };
  // config/config.default.js
  exports.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '49002',
    secret: '85052279ac15addb34e2e11928149ad0195224b3',
  };

  return config;
};


