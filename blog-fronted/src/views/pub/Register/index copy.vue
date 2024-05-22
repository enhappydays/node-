<template>
  <!-- :model  :rules  prop  v-model -->
  <el-form :model="formData" :rules="formRules" ref="registerForm" class="login-form" status-icon>
    <el-form-item prop="username">
      <el-input type="text" v-model="formData.username" autocomplete="off" placeholder="您的账号">
        <template #prefix>
          <el-icon><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        autocomplete="off"
        placeholder="设置密码"
      >
        <template #prefix>
          <el-icon><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input type="text" v-model="formData.nickname" autocomplete="off" placeholder="您的昵称">
        <template #prefix>
          <el-icon><collection /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" round class="btn-register" @click="registerHandler">
        注 册
      </el-button>
      <router-link to="/sign/login" class="msg-register"> 已有账号？去登录 </router-link>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Collection, Lock } from '@element-plus/icons-vue'
import { register } from '@/api/auth'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 使用路由
const router = useRouter()

// 状态：表单数据
const formData = reactive({
  username: '',
  password: '',
  nickname: ''
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
  nickname: {
    required: true,
    trigger: 'blur',
    message: '昵称是必填项'
  }
}

// 状态：表单组件的引用
const registerForm = ref<any>(null)

// 事件监听：点击注册按钮
const registerHandler = async () => {
  // TODO：完成注册逻辑
  // 1. 封装api接口
  // 2. 校验表单 => 拿到 form 组件, 调用 validate()
  // 3. 调用接口进行提交
  // 4. 成功给提示, 跳转到登录

  try {
    // 校验表单
    await registerForm.value.validate()

    // 请求注册
    await register(formData)

    // 成功
    await ElMessageBox.alert('账号注册成功, 前往登录', '温馨提示')

    // 跳转到登录页
    router.replace('/sign/login')
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
.btn-register {
  width: 100%;
}
.msg-register {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
::v-deep .el-icon {
  height: 40px;
  line-height: 40px;
}
</style>
