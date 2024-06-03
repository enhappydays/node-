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
  // 根据id获取用户信息
  async getUserById() {
    const { ctx } = this;
    // 获取请求体参数
    const id = ctx.params.id;
    const result = await ctx.service.user.findById(id);

    ctx.body = {
      success: true,
      data: result,
    };
  }
  async getUserList() {
    const { ctx } = this;
    // 获取请求体参数
    const query = ctx.query;
    const result = await ctx.service.user.getUserListByTitle(query.title);

    ctx.body = {
      success: true,
      data: result,
    };
  }
  async updaterUser() {
    const { ctx } = this;
    // 获取请求体参数
    const body = ctx.request.body;
    await ctx.service.user.update(body);

    ctx.body = {
      success: true,
      data: '更新成功',
    };
  }
  async deleteUser() {
    const { ctx } = this;
    // 获取请求体参数
    const body = ctx.request.body;
    await ctx.service.user.del(body);

    ctx.body = {
      success: true,
      data: '删除成功',
    };
  }
}


module.exports = userController;
