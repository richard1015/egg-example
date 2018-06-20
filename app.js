module.exports = app => {
  //内置缓存
  app.cache = {
    lastCursor: '',//抓取api page页
    errorNum: 0 //错误数量
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
  });
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    console.log(err)
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