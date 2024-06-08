<template>
  <div>
    <h1>我是about页面</h1>
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
      list: ['武当', '峨眉', '昆仑']
    }
  }
}
</script>

<style>

</style>