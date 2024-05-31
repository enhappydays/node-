<template>
  <div class="main-container">
    <!-- 文章列表 -->
    <div class="article-list" v-if="listData.total > 0">
      <!-- 文章列表项 -->
      <div
        class="article-item"
        v-for="article in listData.items"
        :key="article._id"
      >
        <!-- 列表项：左边区域 -->
        <div class="article-info">
          <router-link class="title" :to="`/articles/${article._id}`">
            {{ article.title }}
          </router-link>

          <div class="summary">
            {{ article.summary }}
          </div>

          <div class="info">
            <span>
              {{ article.owner.nickname }}
            </span>
            <span>
              {{ formatDate(article.createdAt) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 分页栏 -->
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="listData.total"
        v-model:pageSize="listParams.pageSize"
        v-model:currentPage="listParams.pageNo"
      >
      </el-pagination>
    </div>

    <div class="article-empty-list" v-else>
      <span>没有文章可以显示</span>
    </div>


    <!-- 文章分类侧边栏 -->
    <category-list />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { listBlogArticles } from "@/api/blog";
import { formatDate } from "@/utils/format";
import CategoryList from "./components/CategoryList.vue";

// 状态：文章列表分页查询参数
const listParams = reactive({
  categoryId: "",
  pageNo: 1,
  pageSize: 10,
});

// 状态：文章列表分页数据
const listData = reactive({
  total: 0,
  items: [] as any[],
});

// 函数：加载文章分页数据
const loadArticleList = async () => {
  const { total, items } = await listBlogArticles(listParams);
  listData.total = total;
  listData.items = items;
};

// 路由参数
const route = useRoute()

// 监听: 根据路由参数的变化, 刷新文章列表
watch(
  () => route.params.id,
  (newVal) => {
    listParams.categoryId = newVal as string || ''
    loadArticleList()
  },
  { immediate: true }
)

// 监听：根据分页参数变化来刷新文章列表
watch([() => listParams.pageNo, () => listParams.pageSize], () => {
  loadArticleList();
});

</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  width: 960px;
  margin: 0 auto;

  .article-list {
    flex: 1;
    padding-top: 15px;

    .article-item {
      display: flex;
      justify-content: space-between;
      margin: 0 0 15px;
      padding: 15px 2px 20px 0;
      border-bottom: 1px solid #f0f0f0;
      word-wrap: break-word;
      box-sizing: border-box;

      .article-info {
        flex: 1;
        margin-right: 20px;

        .title {
          margin: -7px 0 4px;
          display: inherit;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          color: #333;
        }

        .summary {
          margin: 0 0 8px;
          font-size: 13px;
          line-height: 24px;
          color: #999;
        }

        .info {
          font-size: 12px;
          color: #b4b4b4;

          span {
            margin-right: 10px;
          }
        }
      }

      .thumbnail {
        width: 150px;
        height: 100px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }

  .article-empty-list {
    flex: 1;
    padding-top: 100px;
    text-align: center;
    color: #cfcfcf;
  }
}
</style>