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
  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '49002',
    secret: '85052279ac15addb34e2e11928149ad0195224b3',
  };
  // mysql config
  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      news: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'test',
        // 密码
        password: 'test',
        // 数据库名
        database: 'news',
      },
      // ...
    },
    // 所有数据库配置的默认值
    default: {

    },
    // 是否加载到 app 上，默认开启
    app: true,//暂时选择关闭 ，此处如果服务器mysql 服务停止状态  启动node  会异常无法启动 为了处理这种错误机制，此处关闭运行时启动，采用代码动态初始化mysql
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  return config;
};


