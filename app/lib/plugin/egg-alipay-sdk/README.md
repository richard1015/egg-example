# egg-alipay-sdk

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-alipay-sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-alipay-sdk
[travis-image]: https://img.shields.io/travis/eggjs/egg-alipay-sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-alipay-sdk
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-alipay-sdk.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-alipay-sdk?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-alipay-sdk.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-alipay-sdk
[snyk-image]: https://snyk.io/test/npm/egg-alipay-sdk/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-alipay-sdk
[download-image]: https://img.shields.io/npm/dm/egg-alipay-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-alipay-sdk

<!--
Description here.
-->

## Install

```bash
$ npm i egg-alipay-sdk --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.alipaySdk = {
  enable: true,
  package: 'egg-alipay-sdk',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.alipaySdk = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
