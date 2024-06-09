<template>
  <div class="xtx-pagination">
    <!-- 上一页按钮：当前已是第一页 -->
    <span v-if="current <= 1" class="btn disabled">上一页</span>

    <!-- 上一页按钮：当前不是第一页 -->
    <span
      v-else
      class="btn"
      @click="changeHandler(current - 1)"
    >上一页</span>

    <!-- 页码间的省略号：前段 -->
    <span v-if="page.start > 1" class="dot">...</span>

    <!-- 页码数字按钮 -->
    <span
      v-for="i in page.btnNums"
      :key="i"
      class="btn"
      :class="{ active: current === i }"
      @click="changeHandler(i)"
    >{{ i }}</span>

    <!-- 页码间的省略号：后段 -->
    <span v-if="page.end < page.pageCount" class="dot">...</span>

    <!-- 下一页按钮：当前已是最后一页 -->
    <span
      v-if="current >= page.pageCount"
      class="btn disabled"
    >下一页</span>

    <!-- 下一页按钮：当前不是最后一页 -->
    <span
      v-else
      class="btn"
      @click="changeHandler(current + 1)"
    >下一页</span>
  </div>
</template>

<script>
export default {
  props: {
    // 数据总条数
    total: {
      type: Number,
      default: 0
    },
    // 每页数据条数（默认 10 条）
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      current: 1
    }
  },

  computed: {
    page () {
      // 最大显示按钮数
      const maxButtons = 5

      // 总页面数
      const pageCount = Math.ceil(this.total / this.pageSize)

      // 第一轮，理想情况，根据当前页取出起始和结束页码
      let start = this.current - Math.floor(maxButtons / 2)
      let end = start + maxButtons - 1

      // 第二轮，如果起始页码小于1，重新计算起始和结束页码
      if (start < 1) {
        start = 1
        end = (start + maxButtons - 1 > pageCount) ? pageCount : (start + maxButtons - 1)
      }

      // 第三轮，如果结束页码大于总页数，重新计算起始和结束页码
      if (end > pageCount) {
        end = pageCount
        start = (end - maxButtons + 1 < 1) ? 1 : (end - maxButtons + 1)
      }

      // 获取所有要显示的页码
      const btnNums = []
      for (let i = start; i <= end; i++) {
        btnNums.push(i)
      }

      return {
        pageCount, // 总页数
        btnNums, // 要显示的所有页码
        start, // 起始页码
        end // 结束页码
      }
    }
  },

  watch: {
    currentPage: {
      handler (newVal) {
        this.current = newVal
      },
      immediate: true
    }
  },

  methods: {
    changeHandler (page) {
      if (page !== this.current) {
        this.current = page

        // 发送自定义事件
        this.$emit('update:current-page', page)
        this.$emit('current-change', page)
      }
    }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  user-select: none;

  .dot {
    margin-right: 10px;
    color: #999;
  }

  .btn {
    height: 30px;
    line-height: 28px;
    padding: 0 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    color: #666;
    cursor: pointer;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      border-color: @xtxColor;
      color: #fff;
      background-color: @xtxColor;
    }

    &.disabled {
      border-color: #f5f5f5;
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
