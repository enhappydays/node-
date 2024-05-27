const { ObjectId } = require("mongodb");

async function createArticle(ctx,articleInfo){
    console.log(articleInfo);
// 参数处理 

const currentUserId =new ObjectId(ctx?.state?.user?.sub)
const categoryId =new ObjectId(articleInfo?.categoryId)
const { title, summary, content } = articleInfo

// 从文章正文中提取第一张图片作为封面（正文内容是由富文本编辑器产出的 HTML 代码片段）
const thumbnail = content.match(/<img\s(.*?)\s?src="(.*?)"/)?.[2]

// 保存文章
const articleColl = ctx.mongoClient.db().collection('articles')
const result = await articleColl.insertOne({
  ownerId: currentUserId,
  categoryId: categoryId,
  title,
  summary,
  content,
  thumbnail,
  createdAt: new Date(),
  updatedAt: new Date(),
})

if (result.insertedCount === 0) {
  return ctx.throw({ code: 10201, message: '新增文章失败！' })
}
}
/**
 * 当前用户分页查询出自己的文章
 * @param {*} ctx 
 * @param {Object} params 查询参数
 */
async function listArticles(ctx, params) {
    // 参数处理
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const categoryId = params.categoryId
    const keyword = params.keyword
    const pageNo = parseInt(params.pageNo) || 1
    const pageSize = parseInt(params.pageSize) || 10
  
    // 查询条件
    const filter = {
      ownerId: {
        $eq: currentUserId
      }
    }
  
    // 如果传入了搜索关键字，则对文章的标题进行模糊查询
    if (keyword) {
      filter.title = {
        $regex: new RegExp(keyword, 'ig')
      }
    }
  
    // 如果传入了分类，则对文章按照分类进行过滤
    if (categoryId) {
      filter.categoryId = {
        $eq:new ObjectId(categoryId)
      }
    }
  
    // 执行分页查询
    const articleColl = ctx.mongoClient.db().collection('articles')
  
    // 分页查询步骤1：查询符合条件的记录总数
    const total = await articleColl.countDocuments(filter)
  
    // 分页查询步骤2：使用聚合进行文章表和分类表的联表查询，获取当前页数据
    const items = await articleColl.aggregate([
      // 过滤条件
      { $match: filter },
      // 按日期由近到远排序
      { $sort: { createdAt: -1 } },
      // 跳过数据的条数（分页）
      { $skip: (pageNo - 1) * pageSize },
      // 限制一页的条数（分页）
      { $limit: pageSize },
      // 根据文章中的分类ID，联表查出分类的详细数据
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      // 上面联表查询出的数据是一个只包含了一个对象元素的数组，摊平它，成为一个对象
      { $unwind: '$category' },
      // 去除掉不需要的一些字段
      {
        $project: {
          content: 0,
          summary: 0,
          thumbnail: 0,
          ownerId: 0,
          categoryId: 0
        }
      }
    ]).toArray()
  
    return { total, items }
  }
 /**
 * 获取详情
 * @param {*} ctx 
 * @param {Object} id 查询参数
 */ 
async function getArticleById(ctx,id){
    const articleColl = ctx.mongoClient.db().collection('articles')
    return articleColl.findOne({
        _id:new ObjectId(id)
    })
}
 /**
 *删除文章(必须是自己的id)
 * @param {*} ctx 
 * @param {Object} id 查询参数
 */ 
async function removeArticleById(ctx,id){
    // 获取自己id
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const articleColl = ctx.mongoClient.db().collection('articles')
  const result= await articleColl.deleteOne({
        _id:new ObjectId(id),
        ownerId:currentUserId
    })
    console.log('result=====>',result);
if (result.deletedCount===0) {
    return ctx.throw({code:10203,message:"要删除的文章不存在  或 当前用户无权限删除"})
}
return result
}
 /**
 *根据id编辑文章
 * @param {*} ctx 
 * @param {Object} id 查询参数
 */ 
async function editArticleById(ctx,id,articleInfo){
    // 获取自己id
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const categoryId =new ObjectId(articleInfo.categoryId)
    const { title, summary, content } = articleInfo
    // 从文章正文中提取第一张图片作为封面（正文内容是由富文本编辑器产出的 HTML 代码片段）
const thumbnail = content.match(/<img\s(.*?)\s?src="(.*?)"/)?.[2]

const articleColl = ctx.mongoClient.db().collection('articles')


  const result= await articleColl.updateOne({
        _id:new ObjectId(id),
        ownerId:currentUserId
    },
    {
        $set:{
            categoryId,
            title,
            summary,
            content,
            thumbnail,
            updatedAt: new Date(),
        }
    }
)

// if (result.deletedCount===0) {
//     return ctx.throw({code:10203,message:"要删除的文章不存在  或 当前用户无权限删除"})
// }
return result
}
module.exports={
    createArticle,
    listArticles,
    getArticleById,
    removeArticleById,
    editArticleById
}