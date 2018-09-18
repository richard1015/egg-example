# egg-wechat-sdk

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wechat-sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wechat-sdk
[travis-image]: https://img.shields.io/travis/eggjs/egg-wechat-sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-wechat-sdk
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-wechat-sdk.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-wechat-sdk?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-wechat-sdk.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-wechat-sdk
[snyk-image]: https://snyk.io/test/npm/egg-wechat-sdk/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-wechat-sdk
[download-image]: https://img.shields.io/npm/dm/egg-wechat-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wechat-sdk

<!--
Description here.
-->

## Install

```bash
$ npm i egg-wechat-sdk --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.wechatSdk = {
  enable: true,
  package: 'egg-wechat-sdk',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.wechatSdk = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
