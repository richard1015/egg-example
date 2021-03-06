'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
const path = require('path');
exports.ua = {
  enable: true,
  path: path.join(__dirname, '../app/lib/plugin/egg-ua'),
};
exports.wechat = {
  enable: true,
  path: path.join(__dirname, '../app/lib/plugin/egg-wechat-sdk'),
};
exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

