import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref()
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
  return { token, loginBypassword, removeToken }
})
