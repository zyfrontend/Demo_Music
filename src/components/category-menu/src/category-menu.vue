<template>
  <div class="category-menu">
     <div
      class="barItem"
      :class="index == activeNum ? 'active' : ''"
      v-for="(item, index) in menuData"
      :key="index"
      @click="clickSecondBarItem(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuData: []
  },
  data() {
    return {
      activeNum: 0,
    }
  },
  methods: {
    clickSecondBarItem(index) {
      if (this.activeNum == index) {
        return
      }

      this.activeNum = index
      // 将点击事件发射出去 供使用改组件接收事件使用
      this.$emit('clickSecondBarItem', index)
    }
  },
  watch: {
    currentTag(current) {
      this.activeNum = this.SecondNavBarData.findIndex(item => item.name == current.name)
    }
  }
}
</script>
<style lang="less" scoped>
.category-menu {
    display: flex;
    flex-wrap: wrap;
  

  .barItem {
    margin: 4px -2px;
    padding: 6px 15px;
    font-size: 12px;
    /* width: 40px; */
    text-align: center;
    box-sizing: content-box;
    transform: scale(0.9, 0.9);
    cursor: pointer;
  }

  .active {
    background-color: #fdf5f5;
    color: #ec4747;
    border-radius: 11px;
  }
}
</style>
