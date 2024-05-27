const { compare, hash } = require("bcrypt");
const { ObjectId } = require("mongodb")

 
/**
 * 获取个人资料
 * @param {*} ctx 
 */
 const getCurrentUserProfile=async(ctx)=>{
//  获取用户id
const currentUserId=new ObjectId(ctx.state.user.sub)
// 数据库查询
const userColl = ctx.mongoClient.db().collection("users");
const result=await userColl.findOne({_id:currentUserId})
return result
 }
/**
 * 修改个人资料
 * @param {*} ctx 
 */
 const updateProfileBaseinfo=async(ctx,params)=>{
   console.log('params===>>>',params);
//  获取用户id
const currentUserId=new ObjectId(ctx.state.user.sub)
const nickname=params?.nickname
// 数据库查询
const userColl = ctx.mongoClient.db().collection("users");
await userColl.updateOne({
   _id:currentUserId
},
{
   $set:{
      nickname
   }
}
)

 }
/**
 * 修改个人密码
 * @param {*} ctx 
 */
 const updateProfilePassWord=async(ctx,params)=>{
   console.log('params===>>>',params);
//  获取用户id
const currentUserId=new ObjectId(ctx.state.user.sub)
const {oldPassword,newPassword}=params
// 数据库查询
const userColl = ctx.mongoClient.db().collection("users");
// 获取用户信息
const result=await userColl.findOne({
   _id:currentUserId
})
// 对比密码
const isValidOldPass=await compare(oldPassword,result.password)
if (!isValidOldPass) {
   return ctx.throw({
      code:10302,
      message:"输入的旧密码不正确"
   })
}
// 修改密码
const passwordHash=await hash(newPassword,10)
await userColl.updateOne({  _id:currentUserId},
   {
      $set:{
         password:passwordHash
      }
   }
)
 }
/**
 * 修改头像
 * @param {*} ctx 
 */
 const updateProfileAvatar=async(ctx,params)=>{
   console.log('params===>>>',params);
//  获取用户id
const currentUserId=new ObjectId(ctx.state.user.sub)
const {avatar}=params
// 数据库查询
const userColl = ctx.mongoClient.db().collection("users");
// 获取用户信息
await userColl.updateOne({
   _id:currentUserId
},{
   $set:{
      avatar
   }
})
 }
 module.exports={
    getCurrentUserProfile,
    updateProfileBaseinfo,
    updateProfilePassWord,
    updateProfileAvatar
 }