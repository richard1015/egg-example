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
                    followRedirect: true,
                    dataType: 'json'
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
            const newsClient = this.app.database;
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
                    //入库成功说明 错误容错量初始化
                    this.app.cache.errorNum = 0;
                    this.logger.info(item.id + " > " + updateSuccess);
                }).catch(error => {
                    //入库失败错误机制触发
                    this.app.cache.errorNum += 1;
                })
            });
        } catch (error) {
            //数据库异常失败错误机制触发
            this.app.cache.errorNum += 1;
            this.logger.error(error);
        }
    }
}

module.exports = NewsService;