import { ref } from 'vue'
import { captcha } from '@/api/auth'
export const useCaptcha = () => {
  const captchaData = ref()
  const refreshCaptcha = async () => {
    try {
      const res = await captcha()
      console.log(res)

      captchaData.value = res
    } catch (error) {
      console.log(error)
    }
  }

  return {
    captchaData,
    refreshCaptcha
  }
}
