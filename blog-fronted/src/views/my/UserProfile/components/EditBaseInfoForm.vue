<template>
  <el-dialog
    center
    title="修改基本信息"
    width="30%"
    v-model="isVisible"
    :before-close="cancelHandler"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="dialogForm"
      label-width="100px"
      class="profile-form"
      status-icon
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input
          type="text"
          v-model="formData.nickname"
          autocomplete="off"
        ></el-input>
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
import { defineEmits, defineProps, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

// 属性：定义组件的 Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

// 事件触发器：列出本组件中允许触发的所有自定义事件
const emit = defineEmits(["update:visible"]);

// 获取状态管理器
const store = useStore();

// 状态：表单数据
const formData = reactive({
  nickname: store.state.userInfo?.nickname,
});

// 表单验证规则
const formRules = {
  nickname: {
    required: true,
    trigger: "blur",
    message: "昵称是必填项",
  },
};

// 状态：对话框的显示、隐藏
const isVisible = ref<boolean>(false);

// 状态：表单引用
const dialogForm = ref<any>(null);

// 函数：关闭对话框
const closeDialog = () => {
  emit("update:visible", false);
};

// 事件：点击取消或关闭窗口
const cancelHandler = () => {
  closeDialog();
};

// 事件：点击确认按钮
const confirmHandler = async () => {
  try {
    // 表单验证
    await dialogForm.value.validate()

    // 提交发布action
    await store.dispatch('updateProfileBaseInfo', formData)

    // 提示消息
    ElMessage.success('个人基础信息修改成功')

    // 关闭弹框
    closeDialog()
  } catch (e) {}
};

// 监听：监听 Props 的变化
watch(
  () => props.visible,
  (newVal) => {
    // 设置对话框是否可见
    isVisible.value = newVal;
  }
);
</script>