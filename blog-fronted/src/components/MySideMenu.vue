<template>
  <ul class="menu-list">
    <li class="menu-item">
      <router-link to="/my/articles">
        <el-icon><Tickets></Tickets></el-icon>我的文章
      </router-link>
    </li>
    <li class="menu-item">
      <router-link to="/my/profile">
        <el-icon><Setting></Setting></el-icon>个人设置
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Tickets, Setting } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.menu-list {
  width: 280px;
  margin-top: 30px;
  list-style: none;

  .menu-item {
    a {
      display: block;
      padding: 10px 15px;
      color: #333;

      &.router-link-exact-active {
        background-color: #f0f0f0;
        border-radius: 4px;
      }
    }

    .menu-icon {
      padding: 8px;
      background: #a0a0a0;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      margin-right: 10px;
    }
    .el-icon {
      vertical-align: middle;
      font-size: 30px;
      margin-right: 5px;
    }
  }
}
</style>
