<template>
  <el-form :model="formData" :rules="formRules" ref="loginForm" class="login-form" status-icon>
    <el-form-item prop="username">
      <el-input type="text" v-model="formData.username" autocomplete="off" placeholder="您的账号">
        <template #prefix>
          <el-icon><user></user></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        autocomplete="off"
        placeholder="登录密码"
      >
        <template #prefix>
          <el-icon><lock></lock></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="captchaCode">
      <el-input
        type="text"
        v-model="formData.captchaCode"
        autocomplete="off"
        placeholder="图形验证码"
      >
        <template #prefix>
          <el-icon><key></key></el-icon>
        </template>
        <template #append>
          <img class="captcha" :src="captchaData?.svg" @click="refreshCaptcha" width="100" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round class="btn-login" @click="loginHandler"> 登 录 </el-button>
      <router-link to="/sign/register" class="msg-login"> 还没账号？免费注册 </router-link>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { useCaptcha } from '@/hooks/use-captcha'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const { loginBypassword } = useUserStore()
const router = useRouter()

// 状态：表单数据
const formData = reactive({
  username: '',
  password: '',
  captchaCode: ''
})

// 表单验证规则
const formRules = {
  username: {
    required: true,
    trigger: 'blur',
    message: '账号是必填项'
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '密码是必填项'
  },
  captchaCode: {
    required: true,
    trigger: 'blur',
    message: '验证码是必填项'
  }
}

// 状态：表单组件的引用（注意变量名要和组件标签的 ref 值相同）
const loginForm = ref<any>(null)

// 需要验证码逻辑的地方, 直接调用 hook 即可
const { captchaData, refreshCaptcha } = useCaptcha()
refreshCaptcha()

// 事件：点击登录按钮
const loginHandler = async () => {
  try {
    // TODO：登录逻辑
    // 1. 验证表单
    await loginForm.value.validate()

    // 2. 进行登录, 登录成功拿到token, 存vuex (dispatch action)
    console.log('captchaDatacaptchaData', captchaData)

    await loginBypassword({
      ...formData,
      captchaKey: captchaData?.value.key
    })
    // await store.dispatch('login', {
    //   ...formData,
    //   captchaKey: captchaData.captchaKey
    // })

    // 3. 跳转页面
    await router.replace('/my/articles')
  } catch {
    refreshCaptcha()
  }
}
</script>

<style lang="scss" scoped>
.btn-login {
  width: 100%;
}
.msg-login {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
.captcha {
  cursor: pointer;
}
::v-deep .el-icon {
  height: 40px;
  line-height: 40px;
}
</style>
