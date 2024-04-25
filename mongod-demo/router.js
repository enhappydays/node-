const Router =require('@koa/router')

const router=new Router()

router.get('/',async ctx=>{
    ctx.body='shouye'
})

router.get('/list',async ctx=>{
    ctx.body='liebiao'
})
module.exports= router