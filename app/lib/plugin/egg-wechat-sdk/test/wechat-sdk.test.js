'use strict';

const mock = require('egg-mock');

describe('test/wechat-sdk.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/wechat-sdk-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, wechatSdk')
      .expect(200);
  });
});
