const { Service } = require('egg');

class UserService extends Service {
  // 查找列表
  // 从数据库中查找对应title的用户数据
  async getUserListByTitle(title) {
    const result = await this.app.mysql.select('user', {
      where: {
        title,
      },
      columns: [ 'username', 'title', 'id' ],
      limit: 5,
      offset: 0,
    });
    return result;
  }
  // 从数据库中查找对应id的用户数据
  async findById(id) {
    console.log(id);
    const result = await this.app.mysql.get('user', {
      id,
    });
    return result;
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
