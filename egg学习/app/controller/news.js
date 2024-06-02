const { Controller } = require('egg');

class newsController extends Controller {
  async list() {
    const { ctx } = this;
    const result = await ctx.service.news.findById(ctx.params.id);

    ctx.body = {
      success: true,
      data: result,
    };
  }
}


module.exports = newsController;
