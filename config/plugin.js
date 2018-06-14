'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};
const path = require('path');
exports.ua = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-ua'),
}
exports.mysql = {
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
        db2: {
            // host
            host: 'mysql2.com',
            // 端口号
            port: '3307',
            // 用户名
            user: 'test_user',
            // 密码
            password: 'test_password',
            // 数据库名
            database: 'test',
        },
        // ...
    },
    // 所有数据库配置的默认值
    default: {

    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
};