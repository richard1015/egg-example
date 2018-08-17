'use strict';

const Controller = require('egg').Controller;

class CesiumController extends Controller {
    async list() {
        const ctx = this.ctx;
        var info = ["危化企业", "商贸企业", "尾矿库", "建材企业", "救援队伍", "有色金属企业", "机械企业", "烟花爆竹企业", "烟草企业", "煤矿企业", "纺织企业", "轻工企业", "重大危险源"];
        const collectionName = ctx.query.collectionName || '危化企业'
        var p = new Promise((resolve, reject) => {
            try {
                //连接MongoDB数据库
                var MongoClient = require('mongodb').MongoClient,
                    assert = require('assert');

                // Connection URL
                var url = 'mongodb://127.0.0.1:27017/cesium';
                MongoClient.connect(url, function (err, db) {
                    if (err) {
                        reject(err)
                        return;
                    }
                    assert.equal(null, err);
                    console.log("app mongodb database connecttion ok!")
                    findDocuments(db, function (res) {
                        db.close();
                        resolve(res)
                    });
                });
                var findDocuments = function (db, callback) {
                    // get the documents collection
                    var collection = db.collection(collectionName);
                    // find some documents
                    collection.find({}).limit(500).toArray(function (err, docs) {
                        assert.equal(err, null);
                        console.log("Found the following records");
                        callback(docs);
                    });
                };
            } catch (error) {
                reject(error)
            }

        })
        await p.then(res => {
            ctx.body = res;
        }).catch(error => {
            ctx.body = [];
        });






        // ctx.body = ctx.model.News.find({});
    }
}

module.exports = CesiumController;