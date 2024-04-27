// 引入MongoDM驱动包
const {MongoClient}=require('mongodb')
// 引入配置文件
const config=require('../config/config.default')

// 创建mongodb实例,相关配置信息，从config读取

const client =new MongoClient(config.mongodb.uri,config.mongodb.options)

// 开始连接
client.connect()

// 导出
module.exports=client