/**
 * 检查用户名存在
 */

const { hash } = require("bcrypt");

async function checkUsernameExist(ctx, username) {
  const userColl = ctx.mongoClient.db().collection("users");
  const user = await userColl.findOne({ username });
  console.log("user======", user);
  return !!user;
}

/**
 * 进行注册
 * @param {*} ctx
 * @param {*} userInfo  参数
 */
async function doRegister(ctx, userInfo) {
  const { username, nickname, password } = userInfo;
  // 检查用户名是否存在
  const isExist = await checkUsernameExist(ctx, username);
  console.log("isExist===", isExist);
  console.log(username, nickname, password);
  if (isExist) {
    return ctx.throw({ code: 10001, message: "该用户名已存在" });
  }

  // 进行数据库注册
  // 对密码进行 bcrypt加密
  const passwordHash = await hash(password, 10);

  // 往数据库插入数据
  const userColl = ctx.mongoClient.db().collection("users");
  const result = await userColl.insertOne({
    username,
    nickname,
    password: passwordHash,
    createdAt:new Date(),
    updatedAt:new Date()
  });
  console.log(result);
  return !!result.insertedId
}

module.exports = {
  doRegister,
};
