module.exports = app => {
  //内置缓存
  app.cache = {
    lastCursor: '',//抓取api page页
    errorNum: 0, //错误数量
    mysqlState: false //默认关闭mysql
  };
  app.beforeStart(async () => {
    //设置自定义 服务、参数等  ，例如 注入缓存readis 等等
    app.logger.info("app beforeStart... begin")
    // check 网络通信
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    app.logger.info("app runSchedule... begin")
    // await app.runSchedule('update_cache');
    app.logger.info("app runSchedule... ok !")
    //检查 数据库 服务是否连接成功
    app.checkMySqlService = function () {
      var net = require('net');
      var server = net.createServer(function (connection) { });
      server.listen(3306, function () {
        app.logger.info('3306 prot server is listening no mysql ！');
        app.logger.info("app database connecttion error!");
        server.close();
      });
      server.on('error', function (err) {
        app.logger.info('3306 prot server is error begin connecttion mysql ...');
        app.database = app.mysql.createInstance({
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
        });
        //mysql 开启成功
        app.cache.mysqlState = true;
        app.logger.info("app database connecttion ok!")
      })
    };
    app.checkMySqlService();
  });

  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
    ctx.logger.info("request starttime...", ctx.starttime);
    ctx.logger.info("request querystring ===", ctx.querystring);
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
    ctx.logger.info("response endtime...", Date.now());
    ctx.logger.info("response time...", used);
  });
};