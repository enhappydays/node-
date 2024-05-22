<!-- src/layouts/SignLayout.vue -->
<template>
  <div class="sign-container">
    <div class="main">
      <!-- 切换按钮 -->
      <div class="title">
        <router-link to="/sign/login">登录</router-link>
        <b>·</b>
        <router-link to="/sign/register">注册</router-link>
      </div>

      <!-- 表单区域 -->
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-container {
  display: flex;
  background-color: #f1f1f1;
  font-size: 14px;
  min-width: 900px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;

  .main {
    box-sizing: border-box;
    width: 400px;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);

    .title {
      margin: 0 auto 50px;
      padding: 10px;
      font-weight: 400;
      color: #969696;
      font-size: 18px;

      a {
        padding: 10px;
        color: #969696;
      }

      .router-link-exact-active {
        font-weight: 700;
        color: #ea6f5a;
        border-bottom: 2px solid #ea6f5a;
      }
    }
  }
}
</style>
