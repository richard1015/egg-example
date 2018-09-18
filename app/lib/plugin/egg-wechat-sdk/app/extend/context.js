'use strict';
const OAuth = require("../../lib/oauth.js");
const wechatInit = function (app) {
  let { appid, appsecret, token, encodingAESKey } = app.config.wechatSdk;
  let oauth = new OAuth(appid, appsecret);
  return {
    oauth,
  }
}

module.exports = {
  get wechat() {
    return wechatInit(this.app)
  }
};
