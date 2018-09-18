'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const pageIndex = ctx.query.pageIndex || '';
        const pageSize = ctx.query.pageSize || '20'
        const newsList = await ctx.service.news.list(pageIndex == 1 ? '' : pageIndex, pageSize)
        // const newsList = [
        //     { id: 1, title: 'this is news 1', url: '/news/1' },
        //     { id: 2, title: 'this is news 2', url: '/news/2' }
        // ];
        //await this.ctx.render('news/list.tpl', dataList);
        ctx.body = {
            State: 0,
            Value: newsList,
            Msg: '查询成功！'
        };
    }
}

module.exports = NewsController;