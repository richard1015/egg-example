module.exports = app => {
    //内置缓存
    app.cache={
      lastCursor:''
    };
    app.beforeStart(async()=>{
        //设置自定义 服务、参数等  ，例如 注入缓存readis 等等
        app.logger.info("app beforeStart..."+new Date().toString())
    });
    app.once('server', server => {
      // websocket
    });
    app.on('error', (err, ctx) => {
      // report error
    });
    app.on('request', ctx => {
      // log receive request
      ctx.logger.info("request starttime...",ctx.starttime);
      ctx.logger.info("request querystring ===",ctx.querystring);
    });
    app.on('response', ctx => {
      // ctx.starttime is set by framework
      const used = Date.now() - ctx.starttime;
      // log total cost
      ctx.logger.info("response endtime...",Date.now());
      ctx.logger.info("response time...",used);
    });
  };
  ``