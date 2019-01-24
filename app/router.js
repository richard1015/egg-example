'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/cesium', controller.cesium.list);
  router.get('/cesium/index', controller.cesium.index);
  router.get('/cesium/search', controller.cesium.search);
};
