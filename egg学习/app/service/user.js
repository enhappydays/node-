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
  // 操作数据库
  async create({ username, password, title }) {
    // this.app.mysql操作mysql客户端实例
    const result = await this.app.mysql.insert('user', {
      username,
      password,
      title,
    });

    // 判断是否成功
    const isSuccess = result.affectedRows === 1;
    return isSuccess;
  }
}
module.exports = UserService;
