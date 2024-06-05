const { Controller } = require('egg');
const axios = require('axios');
class BookController extends Controller {
  async list() {
    const { ctx } = this;
    const result = await axios.get('http://127.0.0.1:7002/api/list');
    console.log('result===================', result.data.data);
    if (result.status === 200) {
      ctx.body = {
        success: true,
        datas: result.data.data,
      };
    }

  }
  async renderList() {
    const { ctx } = this;
    const result = await axios.get('http://127.0.0.1:7002/api/list');

    await ctx.render('book-list.ejs', {
      data: result.data.data,
    });

    // console.log('result===================', result.data.data);
    // if (result.status === 200) {
    //   ctx.body = {
    //     success: true,
    //     datas: result.data.data,
    //   };
    // }

  }
}

module.exports = BookController;
