const Router =require('@koa/router')
const db=require('./db')
const router=new Router()

router.get('/',async ctx=>{
    const collection=db.collection('friends')
    
    const result=await collection.find()
    // result.forEach(item=>{
    //     console.log(item);
    // })
    const arr=await result.toArray()
    ctx.body=arr
})
router.get('/add',async ctx=>{
    const collection=db.collection('friends')
    
   collection.insertOne({name:'LS',age:18,hoppy:8888})
   const result=await collection.find()
   const arr=await result.toArray()
   ctx.body=arr
    // ctx.body=arr
})
router.get('/delete',async ctx=>{
    const collection=db.collection('friends')
    
   collection.deleteOne({name:'LS',age:18,hoppy:8888})
   const result=await collection.find()
   const arr=await result.toArray()
   ctx.body=arr
    // ctx.body=arr
})
router.get('/update',async ctx=>{
    const collection=db.collection('friends')
    
   collection.updateOne({name:'LS',age:18},
{
    $set:{happpy:777}
})
   const result=await collection.find()
   const arr=await result.toArray()
   ctx.body=arr
    // ctx.body=arr
})

router.get('/list',async ctx=>{
    ctx.body='liebiao'
})
module.exports= router