<template>
  <div class="breadcrumb">
    <div class="item">
      <NuxtLink to="/">
        首页
      </NuxtLink>
      <i class="iconfont icon-angle-right" />
    </div>

    <div class="item">
      <NuxtLink to="/special">
        专题
      </NuxtLink>
      <i class="iconfont icon-angle-right" />
    </div>

    <div class="item">
      <!-- 根据 URL 携带的查询字符串参数，动态显示目录名称 -->
      <span>{{ $route.query.categoryName || "全部专题" }}</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.breadcrumb {
  display: flex;
  font-size: 14px;
  align-items: center;
  height: 70px;
  width: 100%;
  padding-left: 10px;

  a {
    color: #999;
  }

  .iconfont {
    font-size: 12px;
    color: #999;
    margin: 0 5px;
  }
}
</style>
