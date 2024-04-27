const mongodb=require('mongodb')
const MongoClient =mongodb.MongoClient

// 2.客户端实例
const mongoClient=new MongoClient('mongodb://127.0.0.1:27017')

mongoClient.connect()

const db=mongoClient.db('test')

module.exports=db