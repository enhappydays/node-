import { updateAvatar, updateBaseInfo } from './../api/profile'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/auth'
import { getUserProfile } from '@/api/profile'
// import { useRouter } from 'vue-router'
const UserInfo = 'userInfo'
// const router = useRouter()
export const useUserStore = defineStore('user', () => {
  const token = ref()
  token.value = localStorage.getItem('token')
  const userInfo = ref()
  userInfo.value = localStorage.getItem(UserInfo)
  const getUserInfo = async () => {
    try {
      const profile = await getUserProfile()
      userInfo.value = profile
      localStorage.setItem(UserInfo, JSON.stringify(userInfo.value))
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const removeUserinfo = () => {
    localStorage.removeItem(UserInfo)
    userInfo.value = null
  }
  const loginBypassword = async (params: {
    username: string
    captchaKey: string
    password: string
    captchaCode: string
  }) => {
    console.log(params)

    try {
      const res = await login(params)
      token.value = res
      localStorage.setItem('token', token.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const removeToken = () => {
    // router.push('/sign/login')
    token.value = null
    removeUserinfo()
    localStorage.removeItem('token')
  }
  // 修改头像
  const updateProfileAvatar = async (avatar: any) => {
    await updateAvatar(avatar)
    userInfo.value.avatar = avatar
  }
  // 修改个人资料
  const updateProfileBaseInfo = async (params: string) => {
    await updateBaseInfo(params)
    userInfo.value.nickname = params
  }
  return {
    updateProfileBaseInfo,
    token,
    loginBypassword,
    removeToken,
    removeUserinfo,
    getUserInfo,
    userInfo,
    updateProfileAvatar
  }
})
