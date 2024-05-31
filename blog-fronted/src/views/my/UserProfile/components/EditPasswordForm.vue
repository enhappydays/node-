<template>
  <el-dialog center title="修改密码" width="30%" v-model="isVisible" :before-close="cancelHandler">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="dialogForm"
      label-width="100px"
      class="password-form"
      status-icon
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="formData.oldPassword" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="formData.newPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="default" @click="cancelHandler"> 取 消 </el-button>
        <el-button type="primary" @click="confirmHandler"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../../../stores/user'
import { updatePassword } from '@/api/profile'

// 属性：定义组件的 Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

// 事件触发器：列出本组件中允许触发的所有自定义事件
const emit = defineEmits(['update:visible'])

// 获取状态管理器
const store = useUserStore()

// 状态：表单数据
const formData = reactive({
  oldPassword: '',
  newPassword: ''
})

// 表单验证规则
const formRules = {
  oldPassword: {
    required: true,
    trigger: 'blur',
    message: '旧密码是必填项'
  },
  newPassword: {
    required: true,
    trigger: 'blur',
    message: '新密码是必填项'
  }
}

// 状态：对话框的显示、隐藏
const isVisible = ref<boolean>(false)

// 状态：表单引用
const dialogForm = ref<any>(null)

// 函数：关闭对话框
const closeDialog = () => {
  isVisible.value = false
  emit('update:visible', false)
}

// 事件：点击取消或关闭窗口
const cancelHandler = () => {
  closeDialog()
}

// 事件：点击确认按钮
const confirmHandler = async () => {
  try {
    // TODOS
    await dialogForm.value.validate()

    await updatePassword(formData)

    ElMessage.success('密码修改成功')

    closeDialog()
  } catch (e) {}
}

// 监听：监听 Props 的变化
watch(
  () => props.visible,
  (newVal) => {
    // 设置对话框是否可见
    isVisible.value = newVal
  }
)
</script>
