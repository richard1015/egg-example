// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
    async list(pageIndex = '',pageSize='20') {
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
}

module.exports = NewsService;