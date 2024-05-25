import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/auth'
import { getUserProfile } from '@/api/profile'
const UserInfo = 'userInfo'
export const useUserStore = defineStore('user', () => {
  const token = ref()
  token.value = localStorage.getItem('token')
  const userInfo = ref()
  userInfo.value = localStorage.getItem(UserInfo)
  const getUserInfo = async () => {
    try {
      const profile = await getUserProfile()
      userInfo.value = profile
      localStorage.setItem('UserInfo', JSON.stringify(userInfo.value))
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const removeUserinfo = () => {
    localStorage.removeItem(UserInfo)
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
    localStorage.removeItem('token')
  }
  return { token, loginBypassword, removeToken, removeUserinfo, getUserInfo, userInfo }
})
