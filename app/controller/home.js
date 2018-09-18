'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
     this.ctx.body = `hi, egg isIOS: ${this.ctx.isIOS} `;
  }

  async oauth() {
    let { oauth } = this.ctx.wechat;
    let { redirect_url, code } = this.ctx.query;
    // 微信code
    if (code) {
      oauth.getAccessToken(code);
    } else {
      let wxOAuthUrl = oauth.getAuthorizeURL(redirect_url)
      this.ctx.redirect(wxOAuthUrl);
    }

  }
  async getJsApiConfig() {
    let { oauth } = this.ctx.wechat;
    let res = await new Promise((resolve, reject) => {
      oauth.getJSAccessToken((error, data, res) => {
        if (error) {
          resolve(error)
        } else {
          resolve({ data, res })
        }
      });
    });

    this.ctx.body = `getJsApiConfig : ${JSON.stringify(res)} `;
  }
  async getTicket() {
    let access_token = '13_Arz5ayFxTeUQu8_jmXnG3vBYKrImcp7wJLRJ0jq8Wca7jS9i_ibBiFNRHTyfUdayKFDwvi6_baSh9C7XyhUD21iURlBNTvwCNR-Ibz1CycQNlp9KOpvRB8PY_fWqFQ7wqsmv0Gi0Qnuv25BOVNMcADALDC';
    let { oauth } = this.ctx.wechat;
    let res = await new Promise((resolve, reject) => {
      oauth.getTicket(access_token, (error, data, res) => {
        if (error) {
          resolve(error)
        } else {
          resolve({ data, res })
        }
      });
    });

    this.ctx.body = `getTicket : ${JSON.stringify(res)} `;
  }
}

module.exports = HomeController;
