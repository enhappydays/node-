<template>
  <div class="profile-container">
    <!-- 个人资料展示 -->
    <el-form label-width="100px" label-position="left">
      <el-form-item label="头像">
        <div class="avatar-container">
          <div class="avatar">
            <img class="avatar-img" :src="getAvatarImage(profile?.avatar)" alt="" />
          </div>

          <!-- 文件上传组件 -->
          <el-upload
            action=" "
            :show-file-list="false"
            :http-request="sendUploadRequest"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="text">更换</el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="账号">
        <div>{{ profile?.username }}</div>
      </el-form-item>

      <el-form-item label="昵称">
        <div class="form-item-inline">
          <div>{{ profile?.nickname }}</div>
          <el-button type="text" @click="editBaseHandler">修改</el-button>
        </div>
      </el-form-item>

      <el-form-item label="密码">
        <div class="form-item-inline">
          <div>********</div>
          <el-button type="text" @click="editPassHandler">修改</el-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- 编辑个人信息, 昵称 -->
    <EditBaseInfoForm v-model:visible="dialogEditBaseVisible"></EditBaseInfoForm>

    <!-- 编辑密码 -->
    <EditPasswordForm v-model:visible="dialogEditPassVisible"></EditPasswordForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../../../stores/user'
import { getAvatarImage } from '@/utils/resource'
import { ElMessage } from 'element-plus'
import { uploadImage } from '@/api/upload'
import EditBaseInfoForm from './components/EditBaseInfoForm.vue'
import EditPasswordForm from './components/EditPasswordForm.vue'

// 状态: 控制修改昵称的弹框显示隐藏
const dialogEditBaseVisible = ref<boolean>(false)
const dialogEditPassVisible = ref<boolean>(false)

// 获取状态管理器
const store = useUserStore()

// 用户信息
const profile = computed(() => store.userInfo)

// 事件: 控制弹层的显示隐藏
const editBaseHandler = () => {
  dialogEditBaseVisible.value = true
}
const editPassHandler = () => {
  dialogEditPassVisible.value = true
}

// 处理文件上传
const sendUploadRequest = async (obj: any) => {
  // console.log('文件上传', obj)
  const file = obj.file
  // 组装formData
  const formData = new FormData()
  formData.append('file', file, file.name)
  // 执行上传, 上传头像, 得到一个地址
  const result = await uploadImage(formData)
  // 封装好了接口, 上传到服务器, 作为新头像, 要存vuex (action)
  store.updateProfileAvatar(result.location)
  // await store.dispatch('updateProfileAvatar', result.location)
  console.log('上传头像成功')
}

// 处理头像验证
const beforeAvatarUpload = (file: File) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上传头像大小不能超过 2M')
  }
  return isLt2M
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding-right: 30px;

  .el-form-item {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 5px;
    padding: 15px;
  }

  .form-item-inline {
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

  .avatar-container {
    display: flex;
    width: 200px;
    justify-content: space-between;
    align-items: center;

    .avatar {
      width: 98px;
      height: 98px;
      border: 1px solid #dddddd;
      border-radius: 50%;
      padding: 1px;

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
