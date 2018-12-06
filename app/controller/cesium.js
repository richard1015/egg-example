'use strict';

const Controller = require('egg').Controller;
// Connection URL
const mongodbUrl = 'mongodb://127.0.0.1:27017/cesium';
class CesiumController extends Controller {

  async index() {
    let list_array = ['危化企业', '商贸企业', '尾矿库', '建材企业', '救援队伍', '有色金属企业', '机械企业', '烟花爆竹企业', '烟草企业', '煤矿企业', '纺织企业', '轻工企业', '重大危险源', '危化企业抽稀'];
    var MongoClient = require('mongodb').MongoClient;

    this.ctx.body = await new Promise((resolve, reject) => {
      MongoClient.connect(mongodbUrl, function (err, db) {
        if (err) throw err;
        let promises = [];
        for (let index = 0; index < list_array.length; index++) {
          const element = list_array[index];
          // get the documents collection
          let collection = db.collection(element);
          // find some documents
          let p = new Promise((resolve1, reject1) => {
            collection.count((err, res) => {
              resolve1({ name: element, size: res });
            });
          });
          promises.push(p);
        }
        Promise.all(promises).then((result) => {
          db.close();
          resolve(result);
        }).catch((error) => {
          console.log(error)      // 失败了，打出 '失败'
        })


      });
    });


  }
  async list() {
    const ctx = this.ctx;
    const collectionName = ctx.query.collectionName || '危化企业';
    let p = new Promise((resolve, reject) => {
      try {
        // 连接MongoDB数据库
        let MongoClient = require('mongodb').MongoClient,
          assert = require('assert');
        MongoClient.connect(mongodbUrl, function (err, db) {
          if (err) {
            reject(err);
            return;
          }
          assert.equal(null, err);
          console.log('app mongodb database connecttion ok!');
          findDocuments(db, function (res) {
            db.close();
            resolve(res);
          });
        });
        var findDocuments = function (db, callback) {
          // get the documents collection
          let collection = db.collection(collectionName);
          // find some documents
          collection.find({}).limit(500).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log('Found the following records');
            callback(docs);
          });
        };
      } catch (error) {
        reject(error);
      }

    });
    await p.then(res => {
      ctx.body = res;
    }).catch(error => {
      ctx.body = [];
    });


    // ctx.body = ctx.model.News.find({});
  }
}

module.exports = CesiumController;
