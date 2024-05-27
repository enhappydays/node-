/**
 * 检查用户名存在
 */

const { hash, compare } = require("bcrypt");
const { Base64 } = require("js-base64");
const { ObjectId } = require("mongodb");
const jwt=require('jsonwebtoken')
const svgCaptcha = require("svg-captcha");
const config = require("../config/config.default");

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
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(result);
  return !!result.insertedId;
}
/**
 * 生成图片验证码的工具函数
 * @param {*} ctx
 */
async function generateCaptcha(ctx) {
  // 创建生成svg验证码
  const captcha = svgCaptcha.create();

  //  存入缓存验证的表
  const Coll = ctx.mongoClient.db().collection("captcha");
  const result = await Coll.insertOne({
    text: captcha.text,
    createdAt: new Date(),
  });
  //将svg图片转成base64
  const base64Svg = Base64.encode(captcha.data);
  return {
    key: result.insertedId,
    svg: `data:image/svg+xml;base64,${base64Svg}`,
  };
}
/**
 * 登录
 * @param {*} ctx
 * @param {*} loginInfo
 */
async function doLogin(ctx, loginInfo) {
  const { username, password, captchaKey, captchaCode } = loginInfo;
//   查询数据库，是否有验证码
console.log(captchaKey);
const captColl= ctx.mongoClient.db().collection("captcha");
const captcha=await captColl.findOne({
    _id:new ObjectId(captchaKey)
})
console.log('captcha====',captcha);
if (!captcha) {
    return ctx.throw({
        code:10002,
        message:'验证码已过期，请重新获取验证码'
    })
}
if (captcha.text.toUpperCase()!==captchaCode.toUpperCase()) {
    return ctx.throw({
        code:10003,
        message:'验证码不正确，请重新输入'
    })
}
// 查找用户，对比密码
const userColl= ctx.mongoClient.db().collection("users");
const user = await userColl.findOne({ username });
if (!user) {
    return ctx.throw({
        code:10004,
        message:'用户名不正确'
    })
}
// 对比密码
console.log('=====================================',user);
const isValidPassword=await compare(password,user.password)
console.log('isValidPassword=====',isValidPassword);
if (!isValidPassword) {
  return ctx.throw({
    code:10333,
    message:'密码不正确'
  })
}
// 生成token
const token =jwt.sign({
    sub:user._id.toString(), //id
    username
},config.jwt.secret,{
    expiresIn:'36000s'//超时时间
})
  return token;
}
module.exports = {
  doRegister,
  generateCaptcha,
  doLogin,
};
