const { Controller } = require('egg');

class ProductController extends Controller {
  async create() {
    const { ctx } = this;
    const { name, price } = ctx.request.body;
    const { Product } = ctx.model;
    const result = await Product.create({
      name,
      price,
    });
    ctx.body = result;
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { Product } = ctx.model;
    // primary key

    const result = await Product.findByPk(id);

    if (!result) {
      ctx.status = 404;
    }
    const { name, price } = ctx.request.body;

    await result.update({
      name,
      price,
    });
    ctx.body = result;
  }
  async remove() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { Product } = ctx.model;
    // primary key

    const result = await Product.findByPk(id);

    if (!result) {
      ctx.status = 404;
    }
    // const { name, price } = ctx.request.body;

    await result.destroy();
    ctx.body = {
      success: true,
      data: '删除成功',
    };
  }
  async list() {
    const { ctx } = this;

    const { Product } = ctx.model;
    // primary key
    // const { name = null, price = null } = ctx.request.body;
    const result = await Product.findAll({
    //   where: {
    //     price,
    //     name,
    //   },
    });

    // if (!result) {
    //   ctx.status = 404;
    // }
    // const { name, price } = ctx.request.body;


    ctx.body = {
      success: true,
      data: result,
    };
  }
}

module.exports = ProductController;
