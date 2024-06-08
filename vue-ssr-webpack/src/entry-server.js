// 仅仅运行于服务器
import { createApp } from './app'
export default context=>{
    const {app} =createApp()  
    return app
}