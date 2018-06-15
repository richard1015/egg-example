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
        ctx.body = {
            State: 0,
            Value: newsList,
            Msg: '查询成功！'
        };
    }
    async saveDB() {
        const client1 = app.mysql.get('news');
        await client1.query(sql, values);
        // 插入
        const result = await this.app.mysql.insert('news', { 
            id:'',
            order:'',
            title: 'Hello World',
            jsonstr:''
        }); 

        console.log(result);
        // 判断插入成功
        const insertSuccess = result.affectedRows === 1;
    }
}

module.exports = NewsController;