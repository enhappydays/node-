<template>
    <div id="app">
      <div class="nav-menu">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/item/123">一个商品</router-link></li>
      </div>

      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  .nav-menu {
    display: flex;
  }
  .nav-menu li {
    list-style: none;
    margin-right: 20px;
  }
  </style>