module.exports = {
    schedule: {
      interval: '1m', // 隔单位 m 、  s 、  ms   
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      ctx.logger.info('update cache ok !'+Date.now());
    },
  };