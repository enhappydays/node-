const { Controller } = require('egg');

class userController extends Controller {
  async createUser() {
    const { ctx } = this;
    // 获取请求体参数
    const body = ctx.request.body;
    console.log('body======', body);
    const result = await ctx.service.user.create(body);

    ctx.body = {
      success: result,
      data: result ? '用户创建成功' : '用户创建失败',
    };
  }
}


module.exports = userController;
