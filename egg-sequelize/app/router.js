/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/products', controller.product.create);
  router.put('/api/products/:id', controller.product.update);
  router.del('/api/products/:id', controller.product.remove);
  router.get('/api/list', controller.product.list);
};
