<template>
  <ul class="category-list">
    <li class="category-item">
      <router-link to="/"> 全部分类 </router-link>
    </li>
    <li
      class="category-item"
      v-for="category in categories"
      :key="category._id"
    >
      <router-link :to="`/categories/${category._id}`">
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { listCategories } from "@/api/category";

// 状态：所有文章分类
const categories = ref<any[]>([]);

// 函数：请求文章分类数据
const loadCategoryList = async () => {
  const items = await listCategories();
  categories.value = items;
};

loadCategoryList();
</script>

<style lang="scss" scoped>
.category-list {
  width: 240px;
  list-style: none;

  .category-item {
    a {
      display: block;
      padding: 10px 15px;
      color: #333;

      &.router-link-exact-active {
        color: #ea6f5a;
        font-weight: 500;
        background-color: #f0f0f0;
        border-radius: 4px;
      }
    }
  }
}
</style>