const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 隔单位 m 分 、  s 秒、  ms  毫秒 
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true, //配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
      disable: false//配置该参数为 true 时，这个定时任务不会被启动。
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    let ctx = this.ctx;
    ctx.logger.info('update cache errorNum  = ' + ctx.app.cache.errorNum);
    // errorNum 当错误数量 > 50时 停止抓取数据
    if (ctx.app.cache.errorNum > 50) {
      ctx.logger.info('errorNum > 50 stop ');
      return;
    }
    ctx.logger.info('update cache begin ! currentLastCursor = ' + ctx.app.cache.lastCursor);
    const pageIndex = ctx.app.cache.lastCursor || '';
    const pageSize = '20';
    const newsList = await ctx.service.news.list(pageIndex == 1 ? '' : pageIndex, pageSize);
    if (newsList.data.length == 0) {
      //没有数据时错误机制触发
      this.app.cache.errorNum += 1;
      ctx.logger.info('no data stop ! currentLastCursor = ' + ctx.app.cache.lastCursor);
    } else {
      ctx.service.news.saveDB(newsList)
      ctx.app.cache.lastCursor = newsList.data[newsList.data.length - 1].order;
      ctx.logger.info('update cache end ! currentLastCursor set  = ' + ctx.app.cache.lastCursor);
    }
  }
}

module.exports = UpdateCache;