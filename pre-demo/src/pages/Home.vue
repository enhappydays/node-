<template>
  <div>
    <h1>我是home主页</h1>
    <ul>
      <li v-for="item in list" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['橘子', '苹果', '鸭梨']
    }
  }
}
</script>

<style>

</style>