<template>
  <div class="special-list">
    <div class="container">
      <!-- 面包屑 -->
      <special-breadcrumb />

      <div class="content-main">
        <!-- 列表区域 -->
        <div class="article">
          <special-item
            v-for="(item, index) in specialList"
            :key="item.id"
            :list-index="index"
            :special-data="item"
          />
          <pagination
            :total="total"
            :current-page="parseInt($route.query.page || 1)"
            @current-change="pageChangeHandler"
          />
        </div>

        <!-- 边栏区域 -->
        <div class="aside">
          <special-category />
          <special-hot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query }) {
    // 在服务端发送请求，获取数据
    const { data } = await $axios.get('topic', {
      params: {
        classificationId: query.categoryId,
        classificationName: query.categoryName
      }
    })

    // 返回数据，使得 Vue 实例能使用它们
    return {
      specialList: data.result.items,
      total: data.result.counts
    }
  },

  data () {
    return {
      // 列表数据
      specialList: [],
      // 数据总条数
      total: 0
    }
  },

  // 在当前页面的 URL 查询字符串变化时，执行 asyncData
  watchQuery: true,

  methods: {
    pageChangeHandler (page) {
      // 获取当前页面的查询字符串参数
      const { categoryId, categoryName } = this.$route.query

      // 携带新参数，重新跳转到专题页
      this.$router.push({
        path: '/special',
        query: {
          classificationId: categoryId,
          classificationName: categoryName,
          page
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.special-list {
  background: #f5f5f5;

  .content-main {
    display: flex;
  }

  .article {
    width: 880px;
    background: #fff;
  }

  .aside {
    width: 340px;
    margin-left: 20px;
  }
}
</style>
