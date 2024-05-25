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
 module.exports={
    getCurrentUserProfile
 }