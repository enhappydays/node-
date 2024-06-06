'use strict';

const { Service } = require('egg');

const axios = require('axios');

/**
 * 封装网络数据请求相关的服务
 */
class ApiService extends Service {

  constructor(ctx) {
    super(ctx);
    this.API_HOST = 'https://apipc-xiaotuxian-front.itheima.net';
  }

  // 获取导航菜单列表
  async getNavList() {
    const result = await axios.get(`${this.API_HOST}/home/category/head`);
    return result.data.result;
  }

  // 获取品牌列表
  async getBrandList(limit = 10) {
    const result = await axios.get(`${this.API_HOST}/home/brand`, {
      params: { limit },
    });
    return result.data.result;
  }

  // 获取轮播图列表
  async getBannerList() {
    const result = await axios.get(`${this.API_HOST}/home/banner`);
    return result.data.result;
  }

  // 获取新鲜好物列表
  async getNewProductList() {
    const result = await axios.get(`${this.API_HOST}/home/new`);
    return result.data.result;
  }

  // 获取人气推荐列表
  async getHotList() {
    const result = await axios.get(`${this.API_HOST}/home/hot`);
    return result.data.result;
  }

  // 获取商品板块列表
  async getSectionList() {
    const result = await axios.get(`${this.API_HOST}/home/goods`);
    return result.data.result;
  }

  // 获取最新专题列表
  async getSpecialList() {
    const result = await axios.get(`${this.API_HOST}/home/special`);
    return result.data.result;
  }

}

module.exports = ApiService;
