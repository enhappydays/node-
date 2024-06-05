/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/books', controller.book.list);
  router.get('/list', controller.book.renderList);
};
