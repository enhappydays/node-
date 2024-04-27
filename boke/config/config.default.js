// 数据配置相关，Token认证相关
const config={
    // MongoDB  相关配置
    mongodb:{
        uri:'mongodb://root:123456789@locaohost:27017/blog',
        options:{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            authSource:'admin'
        }
    },

    // token相关配置
    jwt:{
        secret:'my-blog-secret'
    }
}

// 导出
module.exports=config