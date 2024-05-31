<template>
  <div class="main-container">
    <div class="article-detail">
      <!-- 文章标题 -->
      <h1 class="title">{{ article?.title }}</h1>

      <!-- 文章基本信息 -->
      <div class="infobar">
        <div class="avatar">
          <img class="avatar-img" :src="getAvatarImage(article?.owner?.avatar)" alt="" />
        </div>
        <div class="desc">
          <div class="nickname">{{ article?.owner?.nickname }}</div>
          <div class="other">
            <span>
              {{ formatDate(article?.createdAt) }}
            </span>
            <span>
              {{ article?.category?.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- 文章正文 -->
      <p class="content" v-html="article?.content"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/blog'
import { formatDate } from '@/utils/format'
import { getAvatarImage } from '@/utils/resource'

// 状态：文章详情
const article = ref<any>(null)

// 路由参数
const route = useRoute()

// 函数：请求文章详情数据
const loadArticle = async () => {
  const id = route.params.id as string
  // 查询详情获取
  const result = await getArticleDetail(id)
  article.value = result
  console.log(article.value)
}

loadArticle()
</script>

<style lang="scss" scoped>
.main-container {
  width: 960px;
  margin: 0 auto;

  .article-detail {
    padding: 32px;
    box-shadow: 0 5px 10px #f0f0f0;

    .title {
      font-size: 30px;
      font-weight: 700;
      word-break: break-word;
      color: #404040;
      text-rendering: optimizelegibility;
      margin-top: 0;
      margin-bottom: 0.5em;
    }

    .infobar {
      display: flex;
      margin-bottom: 32px;

      .avatar {
        width: 40px;
        height: 40px;
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

      .desc {
        margin-left: 10px;
        .nickname {
          font-size: 16px;
          font-weight: 500;
          margin-right: 8px;
          color: #404040;
          margin-bottom: 6px;
        }
        .other {
          font-size: 13px;
          color: #969696;
          span {
            margin-right: 20px;
          }
        }
      }
    }

    .content {
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
</style>
