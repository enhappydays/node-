<template>
  <!-- 顶部导航 -->
  <div class="xtx_topnav">
    <div class="container">
      <ul class="xtx_navs">
        <li v-if="!nickname">
          <NuxtLink to="/login">
            请先登录
          </NuxtLink>
        </li>
        <li v-if="!nickname">
          <NuxtLink to="/register">
            免费注册
          </NuxtLink>
        </li>
        <li v-if="nickname" class="user">
          <NuxtLink to="/member">
            <i class="iconfont icon-zhanghao" />{{ nickname }}
          </NuxtLink>
        </li>
        <li v-if="nickname">
          <a href="javascript:;">退出登录</a>
        </li>
        <li>
          <NuxtLink to="/member/order">
            我的订单
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/member">
            会员中心
          </NuxtLink>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="mobile iconfont icon-phone" />
            手机版
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTopnav',
  data () {
    return {
      nickname: '孙盛希'
    }
  }
}
</script>

<style scoped lang="less">
.xtx_topnav {
  background-color: #333;
  .xtx_navs {
    height: 53px;
    text-align: right;
    line-height: 53px;
    font-size: 0;
    a {
      display: inline-block;
      line-height: 1;
      padding: 0 15px;
      border-right: 2px solid #666666;
      color: #dcdcdc;
      width: 100%;
      &:hover {
        color: #27ba9b;
      }
    }
    li {
      display: inline-block;
      font-size: 14px;
      position: relative;
      text-align: center;
      &:last-child a {
        border-right: none;
        i {
          font-size: 14px;
        }
      }
      &.user a{
        i {
          font-size: 14px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
