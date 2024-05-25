// 控制访问守卫
import router from './router/index'
import { useUserStore } from './stores/user'
// 前置守卫
router.beforeEach(async (to, from, next) => {
  const { token, userInfo, getUserInfo, removeToken, removeUserinfo } = useUserStore()
  if (token) {
    // 是否登录页.
    if (to.path === '/sign/login') {
      next('/my/articles')
    } else {
      if (userInfo?.username) {
        next()
      } else {
        try {
          await getUserInfo()
          next({ ...to, replace: true })
        } catch (error) {
          // token过期
          removeToken()
          removeUserinfo()
          next('/sign/login')
        }
      }
    }
  } else {
    // 是否不对外开放
    // eslint-disable-next-line no-debugger

    if (to.path.indexOf('/my') === 0) {
      next('/sign/login')
    } else {
      next()
    }
  }
})
