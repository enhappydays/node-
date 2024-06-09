<template>
  <!-- 头部栏 -->
  <div class="xtx-header">
    <div class="container">
      <h1 class="logo">
        <a href="/">小兔鲜儿</a>
      </h1>
      <ul class="nav">
        <li><a href="/">首页</a></li>
        <li><a href="/">生鲜</a></li>
        <li><a href="/">美食</a></li>
        <li><a href="/">餐厨</a></li>
        <li><a href="/">电器</a></li>
        <li><a href="/">居家</a></li>
        <li><a href="/">洗护</a></li>
        <li><a href="/">孕婴</a></li>
        <li><a href="/">服装</a></li>
        <li><a href="/">杂货</a></li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search" />
        <input type="search" placeholder="搜一搜">
      </div>
      <a class="cart" href="/">
        <div class="icon">
          <i class="iconfont icon-cart" />
          <span>2</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
}
.xtx-header {
  .logo {
    width: 200px;
    height: 132px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -9999px;
      background: url(../assets/img/logo.png) no-repeat center 16px / contain;
    }
  }
  .nav {
    display: flex;
    width: 840px;
    padding-left: 40px;
    li {
      width: 40px;
      margin-right: 40px;
      text-align: center;
      line-height: 32px;
      a {
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .search {
    width: 160px;
    position: relative;
    input {
      border-bottom: 2px solid #f5f5f5;
      line-height: 30px;
      height: 32px;
      width: 150px;
      padding-left: 30px;
      &::placeholder {
        color: #ccc;
      }
    }
    i {
      position: absolute;
      left: 6px;
      top: 6px;
    }
  }
  .cart {
    width: 40px;
    height: 32px;
    position: relative;
    i {
      font-size: 24px;
    }
    span {
      position: absolute;
      top: -4px;
      right: 4px;
      font-size: 12px;
      line-height: 10px;
      height: 14px;
      vertical-align: middle;
      padding: 1px 6px;
      background: @fuzuColor;
      color: #fff;
      border-radius: 8px;
      transform: scale(0.9);
    }
  }
}
</style>
