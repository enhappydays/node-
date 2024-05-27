
/**
 *根据分类展示文章列表
 */

const { ObjectId } = require("mongodb")
const { create } = require("svg-captcha")


async function listArticleByCategorys(ctx, params) {
//  处理参数
const categoryId=params.categoryId
const pageNo=parseInt(params.pageNo)||1
const pageSize=parseInt(params.pageSize)||10

// 过滤条件
const filter={}
// 如果传入分类，根据分类过滤文章
if (categoryId) {
    filter.categoryId={
        $eq:new ObjectId(categoryId)
    }
}
// if (pageNo) {
//     filter.pageNo={
//         $eq:pageNo
//     }
// }
// if (pageSize) {
//     filter.pageSize={
//         $eq:pageSize
//     }
// }
// 执行分页查询
const articleColl = ctx.mongoClient.db().collection('articles')

//查询所有符合条件记录总数
const total = await articleColl.countDocuments(filter)
// 聚会，进行联表查询
const items=await articleColl.aggregate([
    // 过滤条件
    {$match:filter},
    // 安装日期倒序
    {$sort:{createdAt:-1}},
     // 跳过数据的条数（分页）
     { $skip: (pageNo - 1) * pageSize },
     // 限制一页的条数（分页）
     { $limit: pageSize },
// 根据用户id，联表查用户信息
{
    $lookup:{
        from:"users",
        localField:"ownerId",
        foreignField:"_id",
        as:"owner"
    }
},
// 联表结果扁平化
{$unwind:"$owner"}
]).toArray()

    return {
        total,
        items
    }
}

async function getArticleById(ctx,id){
// 执行分页查询
const articleColl = ctx.mongoClient.db().collection('articles')


// 聚会，进行联表查询
const items=await articleColl.aggregate([
    // 过滤条件
    {$match:{
        _id:new ObjectId(id)
    }},
// 根据用户id，联表查用户信息
{
    $lookup:{
        from:"users",
        localField:"ownerId",
        foreignField:"_id",
        as:"owner"
    }
},
// 联表结果扁平化
{$unwind:"$owner"},
{
    $lookup:{
        from:"categories",
        localField:"categoryId",
        foreignField:"_id",
        as:"categories"
    }
},
// 联表结果扁平化
{$unwind:"$categories"}
]).toArray()
}

module.exports = {
    listArticleByCategorys,
    getArticleById
};
