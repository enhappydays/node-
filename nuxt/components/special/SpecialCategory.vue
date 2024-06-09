<template>
  <div class="special-category">
    <!-- 标题 -->
    <h3 class="topic">
      专题分类
    </h3>

    <!-- 列表 -->
    <ul>
      <li v-for="(item, index) in categoryList" :key="item.id">
        <NuxtLink
          class="icon"
          :to="`/special?categoryId=${item.id}&categoryName=${item.name}`"
        >
          <img :src="require(`@/static/img/special-${index + 1}.png`)" alt="">
          <p>{{ item.name.substr(0, 2) }}</p>
        </NuxtLink>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     categoryList: [
  //       { id: 1, name: "分类1" },
  //       { id: 2, name: "分类2" },
  //       { id: 3, name: "分类3" },
  //       { id: 4, name: "分类4" },
  //       { id: 5, name: "分类5" },
  //       { id: 6, name: "分类6" },
  //       { id: 7, name: "分类7" },
  //       { id: 8, name: "分类8" },
  //     ],
  //   };
  // },

  computed: {
    categoryList () {
      // 从 Vuex 中引入数据
      return this.$store.state.special.categoryList
    }
  },

  created () {
    // 调用 Vuex Action
    this.$store.dispatch('special/getCategoryList')
  }
}
</script>

<style scoped lang="less">
.special-category {
  padding: 0 20px;
  background: #fff;
  margin-bottom: 20px;

  h3 {
    padding-left: 30px;
    background: url(../../assets/img/title.png) no-repeat left center / 20px
      16px;
    font-weight: normal;
    border-bottom: 2px solid #f5f5f5;
    line-height: 65px;
    font-size: 18px;
  }

  .icon();

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;

    li {
      width: 60px;
      margin-right: 20px;
      margin-bottom: 10px;

      &:nth-child(4n) {
        margin-right: 0;
      }

      > p {
        line-height: 36px;
        color: #999;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>
