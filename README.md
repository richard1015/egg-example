# eggTest

最近做了一款 高仿ReadHub小程序  微信小程序 canvas 自动适配 自动换行，保存图片分享到朋友圈  https://gitee.com/richard1015/News

具体代码已被开源，后续我会继续更新，欢迎指正

https://github.com/richard1015/egg-example

https://gitee.com/richard1015/egg-example

你可能会像我一样，平常对科技圈发生的热点新闻很感兴趣。每天利用刚打开电脑的时候，又或者是工作间隙，浏览几个更新及时的科技资讯网站。但是，科技圈每天发生的热点新闻就那么几件。看来看去，新闻的重复度高，硬广软文还看了不少。不仅浪费时间，还抓不住重点。

ReadHub 通过爬虫各种科技新闻 大数据过滤筛选 （个人猜想，大概是这一个意思），所以自己写个爬虫把数据爬到自己mysql数据库中 

代码思路：

通过网上各种调用 动态网站数据 爬虫分为两种解决方案

1.模拟浏览器请求 使用 相应框架  比如：Selenium、PhantomJs。

2.精准分析页面，找到对应请求接口，直接获取api数据。

优点：性能高，使用方便。我们直接获取原数据接口（换句话说就是直接拿取网页这一块动态数据的API接口），肯定会使用方便，并且改变的可能性也比较小。
缺点：缺点也是明显的，如何获取接口API?有些网站可能会考虑到数据的安全性，做各种限制、混淆等。这就需要看开发者个人的基本功了，进行各种分析了。
我个人在爬取ReadHub时，发现《热门话题》 列表是 无混淆，所以找到请求规律，爬取成功 ，剩下 开发者资讯、科技动态、区块链快讯、招聘行情  请求index被混淆，所以暂无成功。
我在本次采用第二种解决方案 chrome浏览器分析 

1.使用chrome  调试工具  Mac  按 alt + cmd+ i    Windows 按 F12   或者 右键检查  或 审查元素  找到Network 选中 xhr模块

![预览](https://images2018.cnblogs.com/blog/600701/201806/600701-20180620142731185-511471371.png "屏幕截图.png")

可通过图片中看到  每次滚动加载数据时  都会有api请求数据， 我们发现 下次触发滚动加载时，的lastCursor的值 为 上次请求的  数组中最后一个对象中的order值

所以我们发现 只是的请求 url地址为 https://api.readhub.me/topic?lastCursor=53058&pageSize=20    中 的lastCursor 动态设置，即可完成抓取数据

![预览](https://images2018.cnblogs.com/blog/600701/201806/600701-20180620143159521-874247137.png "屏幕截图.png")

那么接下来  我们需要  建立mysql数据库 


CREATE DATABASE `news` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
CREATE TABLE `news` (
  `id` varchar(11) COLLATE utf8_bin NOT NULL,
  `order` double NOT NULL,
  `title` varchar(200) COLLATE utf8_bin NOT NULL,
  `jsonstr` json DEFAULT NULL,
  `createdAt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `updatedAt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `insertTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

然后就是编写 nodejs 中代码逻辑  我在下面的抓取冲采用  eggjs 框架中的 egg-mysql 进行连接数据库 https://eggjs.org/zh-cn/tutorials/mysql.html#egg-mysql

使用定时任务来  执行爬取数据

1.news.service 中代码实现

// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
    async list(pageIndex = '', pageSize = '20') {
        try {
            // read config
            const { serverUrl } = this.config.readhub;
            // 热门话题
            const topic = `${serverUrl}topic?lastCursor=${pageIndex}&pageSize=${pageSize}`;
            // use build-in http client to GET hacker-news api
            const result = await this.ctx.curl(topic,
                {
                    dataType: 'json',
                }
            );
            if (result.status === 200) {
                return result.data;
            }
            return [];
        } catch (error) {
            this.logger.error(error);
            return [];
        }
    }
    async saveDB(list) {
        try {
            const newsClient = this.app.mysql.get("news");
            list.data.forEach(item => {
                // 插入
                newsClient.insert('news', {
                    id: item.id,
                    order: item.order,
                    title: item.title,
                    jsonstr: JSON.stringify(item),
                    createdAt: new Date(item.createdAt).getTime(),
                    updatedAt: new Date(item.updatedAt).getTime(),
                }).then(result => {
                    // 判断更新成功
                    const updateSuccess = result.affectedRows === 1;
                    this.logger.info(item.id + " > " + updateSuccess);
                }).catch(error => {
                    //入库失败错误机制触发
                    this.app.cache.errorNum += 1;
                })
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}

module.exports = NewsService;

2.定时任务代码实现

update_cache.js

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


update_cache_init.js
const Subscription = require('egg').Subscription;

class UpdateCacheInit extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: 60 * 24 + 'm', // 隔单位 m 分 、  s 秒、  ms  毫秒 
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true, //配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
      disable: false//配置该参数为 true 时，这个定时任务不会被启动。
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    let ctx = this.ctx;
    ctx.logger.info('update cache init');
    if (ctx.app.cache.errorNum > 50) {
      //初始化内置缓存
      ctx.app.cache = {
        lastCursor: '',
        errorNum: 0 //错误数量
      };
    }
  }
}

module.exports = UpdateCacheInit;

项目运行图

![运行图](https://images2018.cnblogs.com/blog/600701/201806/600701-20180620144325800-696530871.png "屏幕截图.png")
![运行图](https://images2018.cnblogs.com/blog/600701/201806/600701-20180620144445906-863813161.png "屏幕截图.png")


## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
