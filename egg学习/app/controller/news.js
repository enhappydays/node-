const { Controller } = require('egg');

class newsController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = 'hi, egglist';
  }
}


module.exports = newsController;
