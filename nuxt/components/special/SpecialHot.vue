<template>
  <div class="special-hot">
    <!-- 标题 -->
    <h3 class="topic">
      热门专题
    </h3>

    <!-- 列表 -->
    <ul>
      <li v-for="(item, index) in hotList" :key="item.id">
        <NuxtLink :to="`/special/${item.id}`" class="item" :title="item.title">
          <img
            :src="require(`@/static/img/special-small-${index + 1}.png`)"
            alt=""
          >
          <p class="name ellipsis">
            {{ item.title }}
          </p>
          <p class="desc ellipsis">
            {{ item.summary }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // data () {
  //   return {
  //     hotList: [
  //       {
  //         id: 1,
  //         title: '白听写去毛运组府性基养做消展决规过较土水新半',
  //         summary: '行形资记动几组分每会导'
  //       },
  //       {
  //         id: 2,
  //         title: '白听写去毛运组府性基养做消展决规过较土水新半',
  //         summary: '行形资记动几组分每会导'
  //       },
  //       {
  //         id: 3,
  //         title: '白听写去毛运组府性基养做消展决规过较土水新半',
  //         summary: '行形资记动几组分每会导'
  //       },
  //       {
  //         id: 4,
  //         title: '白听写去毛运组府性基养做消展决规过较土水新半',
  //         summary: '行形资记动几组分每会导'
  //       },
  //       {
  //         id: 5,
  //         title: '白听写去毛运组府性基养做消展决规过较土水新半',
  //         summary: '行形资记动几组分每会导'
  //       }
  //     ]
  //   }
  // },

  computed: {
    hotList () {
      return this.$store.state.special.hotList
    }
  },

  created () {
    this.$store.dispatch('special/getHotList')
  }
}
</script>

<style scoped lang="less">
.special-hot {
  padding: 0 20px 20px;
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

  .item {
    display: block;
    height: 60px;
    width: 100%;
    position: relative;
    display: block;
    margin-top: 20px;

    img {
      width: 100px;
      height: 60px;
      position: absolute;
      left: 0;
      top: 0;
    }

    p {
      padding-left: 110px;
      line-height: 24px;

      &.name {
        font-size: 14px;
      }

      &.desc {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
