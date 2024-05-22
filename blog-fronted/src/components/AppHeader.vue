<template>
  <nav class="top-nav">
    <div class="nav-container limit-width">
      <router-link class="logo" to="/">
        <span>简博客</span>
      </router-link>

      <!-- 未登录时显示的内容 -->
      <div class="logininfo" v-if="true">
        <!-- <div class="logininfo" v-if="!profile?.username"> -->
        <router-link to="/sign/login">登录</router-link>
        <b>·</b>
        <router-link to="/sign/register">注册</router-link>
      </div>

      <!-- 已登录时显示的内容 -->
      <div class="userinfo" v-else>
        <!-- <span>{{ profile?.nickname }}</span> -->
        <el-dropdown @command="commandHandler">
          <!-- <span class="el-dropdown-link">
            <div class="avatar">
              <img class="avatar-img" alt="" :src="getAvatarImage(profile?.avatar)" />
            </div>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
// import { getAvatarImage } from '@/utils/resource'
import { useRouter } from 'vue-router'

// 获取store
const store = useUserStore()
// 获取router
const router = useRouter()

// 获取用户信息
// const profile = computed(() => store.state.userInfo)

// 提供处理函数, 下拉菜单
const commandHandler = (command: string) => {
  if (command === 'profile') {
    router.push('/my/profile')
  } else if (command === 'logout') {
    // store.dispatch('clearLogin')
    router.push('/sign/login')
  }
}
</script>

<style lang="scss" scoped>
.top-nav {
  background: #ffffff;

  .limit-width {
    min-width: 768px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;

    .logo {
      font-size: 28px;
      color: #ea6f5a;
    }

    .logininfo {
      a {
        color: #969696;
        padding: 0 10px;
      }
      b {
        color: #969696;
      }
    }

    .userinfo {
      display: flex;
      align-items: center;
      color: #969696;

      .avatar {
        width: 40px;
        height: 40px;
        border: 1px solid #dddddd;
        border-radius: 50%;
        padding: 1px;

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          vertical-align: middle;
        }
      }

      .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 6px 10px 6px 16px;

        &:hover {
          background-color: #f5f5f5;
        }
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>
