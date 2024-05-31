<template>
  <!-- 弹窗 -->
  <el-dialog
    center
    fullscreen
    :title="dialogStatus.isEdit ? '修改文章' : '新增文章'"
    :show-close="true"
    v-model="dialogStatus.isVisible"
    :before-close="cancelHandler"
  >
    <!-- 弹窗中的表单 -->
    <el-form
      ref="dialogForm"
      label-width="100px"
      class="article-form"
      status-icon
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input type="text" autocomplete="off" v-model="formData.title"></el-input>
      </el-form-item>

      <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="formData.categoryId">
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章概要" prop="summary">
        <el-input
          type="textarea"
          placeholder="请输入文章概要介绍"
          v-model="formData.summary"
          :rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章正文" prop="content">
        <editor
          :api-key="'x7ep0bd80kcswsxnf1blpcjpnya0pqfb27f4zu8ilhjbc5vs'"
          :init="editorOptions"
          v-model="formData.content"
        />
      </el-form-item>
    </el-form>

    <!-- 弹窗底部的按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="default" @click="cancelHandler"> 取 消 </el-button>
        <el-button type="primary" @click="submitHandler"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { createArticle, updateArticle } from '@/api/article'
// import { uploadImage } from '@/api/upload';
import { baseURL } from '@/utils/request'
import { dayjs } from 'element-plus'

interface Category {
  _id: string
  createdAt: string
  name: string
}

// 定义props
const props = defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    default: () => []
  },
  article: {
    type: Object,
    default: () => ({})
  },
  visible: {
    type: Boolean,
    default: false
  }
})

// 对话框的状态
const dialogStatus = reactive({
  isVisible: false,
  isEdit: false
})

// 状态: 表单数据
const formData = reactive({
  _id: '',
  title: '', // 非空
  categoryId: '', // 非空
  summary: '',
  content: ''
})

// 状态: 表单引用
const dialogForm = ref<any>(null)

// 验证规则
const formRules = {
  title: {
    required: true,
    trigger: 'blur',
    message: '文章标题为必填项'
  },
  categoryId: {
    required: true,
    trigger: 'blur',
    message: '文章分类是必填项'
  }
}

// 状态：富⽂本编辑器 TinyMCE 的配置
const editorOptions = reactive({
  // 编辑器⾼度
  height: 500,
  // 不显⽰顶部菜单栏
  menubar: false,
  // 不显⽰底部 TinyMCE 的版权⽂字
  branding: false,
  // 界⾯语⾔包⽂件的路径
  language_url: '/tinymce/langs/zh_CN.js',
  // 界⾯显⽰语⾔
  language: 'zh_CN',
  // 界⾯使⽤的⽪肤⽂件路径
  skin_url: '/tinymce/skins/ui/oxide',
  // 启⽤的插件
  // plugins: ['lists link image table code help wordcount'],
  // 启⽤的⼯具栏按钮
  // toolbar: [
  //   'undo redo | formatselect | forecolor bold italic backcolor | ',
  //   'alignleft aligncenter alignright alignjustify | ',
  //   'bullist numlist outdent indent | ',
  //   'removeformat | fullscreen image'
  // ].join(''),
  // 编辑器初始显示内容
  contentValue: formData.content,
  selector: 'textarea',
  plugins:
    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  tinycomments_mode: 'embedded',
  tinycomments_author: 'Author name',
  mergetags_list: [
    { value: 'First.Name', title: 'First Name' },
    { value: 'Email', title: 'Email' }
  ]

  // 自定义图片上传逻辑
  // images_upload_handler: async (blobInfo: any, succFun: any, failFun: any) => {
  //   // 使用formData进行文件上传
  //   const fd = new FormData()
  //   fd.append('file', blobInfo.blob(), blobInfo.filename())

  //   // 调用接口, 执行文件上传
  //   const { location } = await uploadImage(fd)
  //   console.log(location)
  //   // 调用成功的函数, 通知 TinyMCE 编辑器, 上传成功的图片路径
  //   succFun(baseURL + location)
  // }
})

// 事件触发器: 列出组件中允许被触发的所有自定义事件
const emit = defineEmits(['update:visible', 'complete'])

// 关闭对话框
const cancelHandler = () => {
  emit('update:visible', false)
}

// 事件: 点击确认按钮
const submitHandler = async () => {
  // 表单验证
  await dialogForm.value.validate()
  // 执行新增或者修改
  if (dialogStatus.isEdit) {
    await updateArticle(formData)
  } else {
    await createArticle(formData)
  }

  // 发送自定义事件
  emit('complete', dialogStatus.isEdit)

  // 关闭弹框
  cancelHandler()
}

// 监听: props的变化
watch([() => props.visible, () => props.article], (newVals) => {
  const [visible, article] = newVals
  // 设置对话框可见
  dialogStatus.isVisible = visible

  // 动态设置编辑状态
  dialogStatus.isEdit = !!article._id

  // 设置表单数据
  formData._id = article._id
  formData.title = article.title
  formData.summary = article.summary
  formData.content = article.content
  formData.categoryId = article.categoryId
})
</script>

<style lang="scss" scoped>
.article-form {
  width: 960px;
  margin: 0 auto;
}
</style>

<style lang="scss">
.tox-tinymce-aux {
  z-index: 5000 !important;
}
</style>
