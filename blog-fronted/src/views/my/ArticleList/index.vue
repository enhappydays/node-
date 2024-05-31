<template>
  <div class="article-container">
    <!-- =============== 搜索工具栏 =============== -->
    <div class="search-bar">
      <el-form ref="searchForm" label-width="100px" class="search-form" inline>
        <el-form-item>
          <el-input
            type="text"
            autocomplete="off"
            placeholder="请输入文章标题关键字"
            v-model="listParmas.keyword"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 200px"
            placeholder="请选择文章分类"
            v-model="listParmas.categoryId"
          >
            <el-option label="全部分类" value=""></el-option>
            <el-option
              v-for="category in categories"
              :key="category._id"
              :label="category.name"
              :value="category._id"
            >
            </el-option>
            <template #prefix>
              <el-icon><files></files></el-icon>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button plain type="primary" @click="searchHandler">
            <el-icon><search></search></el-icon>
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <div class="tool-buttons">
        <el-button plain type="success" @click="createHandler">
          <el-icon><plus></plus></el-icon>
          创建文章
        </el-button>
      </div>
    </div>

    <!-- =============== 文章列表 =============== -->
    <el-table class="article-table" :data="listData.items">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="所属分类" width="200" align="center" prop="category.name">
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="200" align="center">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="editHandler(row)">
            <el-icon><edit></edit></el-icon>
            编辑
          </el-button>

          <el-button type="text" @click="removeHandler(row)">
            <el-icon><Delete></Delete></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- =============== 分页 =============== -->
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :total="listData.total"
      :page-sizes="[5, 10, 15, 20]"
      v-model:pageSize="listParmas.pageSize"
      v-model:currentPage="listParmas.pageNo"
    >
    </el-pagination>

    <CreateOrUpdateForm
      v-model:visible="dialogVisible"
      :categories="categories"
      :article="dialogFormData"
      @complete="completeHanlder"
    >
    </CreateOrUpdateForm>
  </div>
</template>

<script lang="ts" setup>
// import { getArticle, listArticles, removeArticle } from '@/api/article'
import { getArticle, removeArticle, getArticleType, getArticleDetail } from '@/api/article'
import { Search, Edit, Files, Plus, Delete } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
import { formatDate } from '@/utils/format'
import CreateOrUpdateForm from './components/CreateOrUpdateForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 状态: 文章列表数据
const listData = reactive({
  total: 0,
  items: [] as any[] // 手动指定 items 的类型 (类型断言)
})
// 状态: 查询文章列表的相关参数
const listParmas = reactive({
  categoryId: '',
  keyword: '',
  pageNo: 1,
  pageSize: 5
})
// 状态: 获取所有文章分类
const categories = ref<any[]>([])

// 状态: 控制对话框显示隐藏
const dialogVisible = ref<boolean>(false)

// 状态: 暂存对话框的数据
const dialogFormData = reactive({
  _id: '',
  title: '',
  summary: '',
  content: '',
  categoryId: ''
})

// 请求文章的函数
const loadArticleList = async () => {
  const { total, items } = await getArticle(listParmas)
  listData.total = total
  listData.items = items
}
// 请求文章分类的函数
const loadCategoryList = async () => {
  const items = await getArticleType()
  categories.value = items
  console.log(items)
}
loadCategoryList()

// 事件: 点击搜索按钮, 完成搜索功能
const searchHandler = () => {
  // 页面设置为第一页, 搜索条件变化, 整个搜索出来的数据肯定会变化, 不需要停留在原来的第2页
  listParmas.pageNo = 1
  loadArticleList()
}

// 事件: 处理点击添加按钮
const createHandler = () => {
  // 重置数据
  dialogFormData._id = ''
  dialogFormData.title = ''
  dialogFormData.summary = ''
  dialogFormData.content = ''
  dialogFormData.categoryId = ''

  dialogVisible.value = true
}

// 事件: 处理编辑
const editHandler = async (row: any) => {
  // row 当前行的数据, 基于 row._id 发送请求, 获取文章详情数据, 用于回显
  const article = await getArticleDetail(row._id)

  dialogFormData._id = article._id
  dialogFormData.title = article.title
  dialogFormData.summary = article.summary
  dialogFormData.content = article.content
  dialogFormData.categoryId = article.categoryId

  // 显示对话框
  dialogVisible.value = true
}

// 事件: 处理删除按钮
const removeHandler = async (row: any) => {
  await ElMessageBox.confirm('确认要删除这篇文章么', '温馨提示')
  await removeArticle(row._id)
  await loadArticleList()
  ElMessage.success('文章删除成功...')
}

// 处理编辑或新增成功
const completeHanlder = (isEdit: boolean) => {
  // 新增数据, 新增到第一页去, 新增重新渲染第一页, 编辑重新加载当前页
  if (!isEdit) {
    listParmas.pageNo = 1
  }

  // 更新当前页
  loadArticleList()
}
// 监视: 监视分页数据的变化, 如果变化了, 立刻发送请求重新渲染
watch(
  [() => listParmas.pageNo, () => listParmas.pageSize],
  () => {
    loadArticleList()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.article-container {
  padding-right: 30px;

  .search-bar {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .article-table {
    margin-bottom: 30px;
  }
}
</style>
