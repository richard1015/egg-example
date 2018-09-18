'use strict';

const mock = require('egg-mock');

describe('test/alipay-sdk.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/alipay-sdk-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, alipaySdk')
      .expect(200);
  });
});
