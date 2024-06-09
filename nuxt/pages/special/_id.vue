<template>
  <div class="special-item">
    <!-- 头部区域 -->
    <div class="head">
      <h1>忙里忙外，回家吃饭 家的味道，怎可辜负</h1>
      <h3>
        <p>天天炊事，应样样关心。外面奔波，常回家吃饭。</p>
        <p>何不邀上三五好友，共享家庭美味。</p>
      </h3>
    </div>

    <!-- 内容区域 -->
    <div class="container">
      <!-- 内容区域工具栏 -->
      <section class="optional">
        <a href="javascript:;" class="iconfont icon-wjx02">100+</a>
        <a href="javascript:;" class="iconfont icon-chakan">200</a>
        <a href="javascript:;" class="iconfont icon-fenxiang" />
      </section>

      <!-- 内容条目容器 -->
      <section class="part">
        <div class="intro">
          <i>1</i>
          <p class="tit">
            吃的营养，吃的健康，吃的温馨
          </p>
          <p class="con">
            在家做饭，为亲朋好友送上一顿团聚的大餐回家吃饭，
            也是安全健康，营养团聚的保障
            各种营养美食，保证家里的饮食多样，平衡膳食，增强体质，增进感情，为亲朋好友送上一顿团聚的大餐回家吃饭，
            也是安全健康，营养团聚的保障
            各种营养美食，保证家里的饮食多样，平衡膳食，增强体质，增进感，为亲朋好友送上一顿团聚的大餐回家吃饭，
            也是安全健康，营养团聚的保障
            各种营养美食，保证家里的饮食多样，平衡膳食，增强体质。
          </p>
        </div>
        <div class="goods">
          <a
            v-for="i in 4"
            :key="i"
            class="item"
            href="http://www.erabbit.com/product/1022012311"
          >
            <img
              src="https://yanxuan-item.nosdn.127.net/f7a4f643e245d03771d6f12c94e71214.png"
              alt=""
            >
            <p class="name">VGA网口多功能转接器</p>
            <p class="desc">小巧便携，节省桌面空间</p>
            <p class="price">&yen;182.00</p>
            <span class="buy">立即购买</span>
          </a>
        </div>
      </section>

      <section class="part">
        <div class="intro">
          <i>2</i>
          <p class="tit">
            各类餐具帮你锦上添花
          </p>
          <p class="con">
            每道菜都是独一无二的烹饪过程 杯盏碗碟，满足你所有装盘需求
            锅碗瓢盆，满足你所有加工过程
          </p>
        </div>
        <div class="goods">
          <a
            v-for="i in 4"
            :key="i"
            class="item"
            href="http://www.erabbit.com/product/1022012311"
          >
            <img
              src="https://yanxuan-item.nosdn.127.net/f7a4f643e245d03771d6f12c94e71214.png"
              alt=""
            >
            <p class="name">VGA网口多功能转接器</p>
            <p class="desc">小巧便携，节省桌面空间</p>
            <p class="price">&yen;182.00</p>
            <span class="buy">立即购买</span>
          </a>
        </div>
      </section>

      <section class="part">
        <div class="intro">
          <i>3</i>
          <p class="tit">
            厨房家电帮你解锁创作新方式
          </p>
          <p class="con">
            煎炒烹炸，灶具供应精准火候 闷溜熬炖，锅具激发你的各种灵感
            烘焙、冰冻、烧烤、各种神器助力阖家享受欢聚大餐
          </p>
        </div>
        <div class="goods">
          <a
            v-for="i in 4"
            :key="i"
            class="item"
            href="http://www.erabbit.com/product/1022012311"
          >
            <img
              src="https://yanxuan-item.nosdn.127.net/f7a4f643e245d03771d6f12c94e71214.png"
              alt=""
            >
            <p class="name">VGA网口多功能转接器</p>
            <p class="desc">小巧便携，节省桌面空间</p>
            <p class="price">&yen;182.00</p>
            <span class="buy">立即购买</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ route, $axios }) {
    // 通过 route 获取动态路由参数
    const id = route.params.id
    const result = await $axios.get(`topic/${id}`)
    console.log(result.status, result.data.result)
  }
}
</script>

<style scoped lang="less">
.special-item {
  background: #f5f5f5;
  position: relative;
  padding-top: 360px;

  .head {
    color: #fff;
    text-align: center;
    height: 567px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(https://static.360buyimg.com/mtd/pc/fresh_athena2x/1.0.0/static/images/fs_bg1.jpg)
      no-repeat center / cover;

    h1 {
      font-size: 60px;
      font-weight: normal;
      padding-top: 100px;
    }

    h3 {
      font-size: 20px;
      margin-top: 30px;
      line-height: 36px;
      font-weight: normal;
    }
  }

  .container {
    background-color: #fff;
    border-radius: 30px 30px 0 0;
    min-width: 500px;

    .optional {
      text-align: right;
      line-height: 50px;
      padding: 0 50px;

      a {
        margin-left: 20px;
        font-size: 14px;
        color: #999;

        &::before {
          font-size: 18px;
          margin-right: 3px;
        }

        &.active {
          color: @xtxColor;
        }
      }
    }

    .part {
      padding: 0 50px;

      .intro {
        position: relative;

        > i {
          width: 90px;
          height: 90px;
          text-align: center;
          line-height: 80px;
          font-style: italic;
          font-size: 40px;
          background: #fff;
          border: 3px solid @xtxColor;
          color: @xtxColor;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          user-select: none;
        }

        > .tit {
          padding-left: 140px;
          font-size: 22px;
          line-height: 40px;
        }

        > .con {
          padding-left: 140px;
          color: #999;
          line-height: 24px;
        }
      }

      .goods {
        padding: 50px 0;
        display: flex;
        justify-content: space-around;

        .item {
          width: 258px;
          height: 372px;
          text-align: center;
          transition: all 0.6s;

          &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }

          img {
            width: 190px;
            height: 190px;
            margin-top: 20px;
          }

          p {
            padding-top: 12px;

            &.desc {
              font-size: 14px;
              color: #999;
            }

            &.price {
              color: @priceColor;
              font-size: 18px;
            }
          }

          .buy {
            width: 100px;
            height: 32px;
            display: inline-block;
            background: @xtxColor;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            border-radius: 4px;
            margin: 12px;
          }
        }
      }
    }
  }
}
</style>
