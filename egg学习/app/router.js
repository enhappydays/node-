/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news/:id', controller.news.list);
  // ------------------------------------------------------------------------------------------------------------sql
  router.post('/user/create', controller.user.createUser);
};
