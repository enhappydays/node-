'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;

    const [ navs, banners, newProducts, hots, brands, sections, specials ] = await Promise.all([
      service.api.getNavList(),
      service.api.getBannerList(),
      service.api.getNewProductList(),
      service.api.getHotList(),
      service.api.getBrandList(10),
      service.api.getSectionList(),
      service.api.getSpecialList(),
    ]);

    const categories = await service.category.getCategoryList(navs);

    // 渲染页面
    await ctx.render('index.ejs', {
      navs,
      categories,
      banners,
      newProducts,
      hots,
      brands,
      sections,
      specials,
    });
  }
}

module.exports = HomeController;
