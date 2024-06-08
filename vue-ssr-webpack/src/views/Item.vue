<template>
    <div>我是item信息 - {{ item.title }}</div>
  </template>
  
  <script>
  export default {
    // 预取数据
    asyncData({ store, route }) {
      // 获取动态路由参数
      const id = route.params.id
  
      // 触发获取数据的 action
      return store.dispatch('fetchItem', id)
    },
  
    computed: {
      item () {
        const id = this.$route.params.id
        return this.$store.state.items[id]
      }
    }
  }
  </script>
  
  <style>
  
  </style>