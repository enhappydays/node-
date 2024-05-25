 
/**
 * 获取分类
 * @param {*} ctx 
 */
const getAllCategories=async(ctx)=>{

    // 数据库查询
    const Coll = ctx.mongoClient.db().collection("categories");
    const result=await Coll.find().toArray()
    return result
     }
     module.exports={
        getAllCategories
     }