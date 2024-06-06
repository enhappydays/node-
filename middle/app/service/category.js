// 封装 axios 请求相关的 api
'use strict';

const { Service } = require('egg');

class CategoryService extends Service {
  // 处理左侧菜单数据
  async getCategoryList(navs) {
    const categories = navs.map(item => {
      return {
        id: item.id,
        name: item.name,
        children: item.children.slice(0, 2),
      };
    });

    return categories;
  }
}

module.exports = CategoryService;
