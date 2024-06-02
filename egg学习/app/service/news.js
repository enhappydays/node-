
const { Service } = require('egg');

class UserService extends Service {
// 从数据库中查找对应id的用户数据
  async findById(id) {
    console.log(id);

    return {
      id,
      name: '55555',
    };
  }
}
module.exports = UserService;
