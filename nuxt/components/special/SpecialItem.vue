<template>
  <div class="special-item">
    <!-- 左边区域 -->
    <div class="head">
      <NuxtLink class="icon" :to="`/special?categoryId=${specialData.classification.id}&categoryName=${specialData.classification.name}`">
        <img :src="require(`@/static/img/special-${listIndex + 2}.png`)" alt="">
        <p>{{ specialData.classification.name.substr(0, 2) }}</p>
      </NuxtLink>
      <p>{{ specialData.classification.name }}</p>
      <p>{{ specialData.updateTime }}</p>
    </div>

    <!-- 右边区域 -->
    <div class="body">
      <NuxtLink class="content" :to="`/special/${specialData.id}`">
        <div class="image">
          <img :src="require(`@/static/img/special-large-${listIndex + 1}.png`)" alt="">
          <div class="foot">
            <p>
              <i class="iconfont icon-xiaoxi" />
              <span>{{ specialData.viewNum }}</span>
            </p>
            <p>
              <i class="iconfont icon-xin" />
              <span>{{ specialData.collectNum }}%</span>
            </p>
          </div>
        </div>

        <p class="name ellipsis">
          {{ specialData.title }}
        </p>

        <p class="desc ellipsis">
          {{ specialData.summary }}
        </p>

        <p class="price">
          {{ specialData.lowestPrice }}起
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specialData: {
      type: Object,
      default: () => {}
    },
    listIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang='less'>
.special-item{
  display: flex;
  align-items: flex-start;
  padding: 50px 0;
  border-bottom:1px solid #f5f5f5;

  .head {
    width: 200px;
    padding-left: 50px;

    .icon();

    > p {
      color: #666;
      padding-top: 5px;
    }
  }

  .body {
    flex: 1;

    .content {
      width: 600px;
      height: 415px;
      background: #f7f5f1;
      padding: 15px;
      position: relative;
      display: block;

      .image {
        width: 100%;
        height: 320px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        .foot {
          height: 36px;
          line-height: 36px;
          background: linear-gradient(90deg,rgba(0,0,0,0.6),rgba(0,0,0,0.2));
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          width: 100%;
          color: #fff;

          p {
            margin-left: 20px;
            font-size: 14px;

            i {
              margin-right: 3px;
            }
          }
        }
      }

      .name {
        font-size: 18px;
        padding-top: 15px;
        padding-right: 100px;
      }

      .desc {
        font-size: 14px;
        padding-top: 5px;
        color: #999;
        padding-right: 100px;
      }

      .price {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
</style>
