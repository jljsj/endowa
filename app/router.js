'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/basic/fetch', controller.basic.fetchAll);
  router.post('/basic/fetch/:id', controller.basic.fetch);
  router.post('/basic/update/:id', controller.basic.update);
  router.post('/list/:path/fetch/:id', controller.list.getCurrent);
  router.post('/list/:path/fetch', controller.list.fetch);
  router.post('/list/:path/update/:id', controller.list.update);
  router.post('/list/:path/sequence', controller.list.sequence);
  router.post('/list/:path/create', controller.list.create);
  router.post('/list/:path/remove', controller.list.remove);
  router.post('/login/account', controller.user.login);
  router.post('/user/getuser', controller.user.getUser);
  router.post('/upload', controller.home.upload);
  router.get('*', controller.home.index);
};

/*
module.exports = app => {
  app.router.get('/user/:id', app.controller.home.info);
};
 */
