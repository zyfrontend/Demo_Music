<template>
  <div class="musiclist-menu">
    <div class="menu-left">
      <el-popover
        placement="bottom-start"
        width="350"
        popper-class="sortPop"
        trigger="click"
        :visible-arrow="false"
        v-model="isSortPopShow"
        @show="showSortPop"
      >
        <div class="sort-box" slot="reference">{{ currentTag.name }} <i class="iconfont icon-arrow-right-bold"></i></div>
        <div class="tips" v-if="sortList.length == 0">正在加载分类数据...</div>
        <div class="sort-list" v-else>
          <div
            class="sort-itme"
            :class="currentTag.name == item.name ? 'current-item' : ''"
            v-for="item in sortList"
            :key="item.name"
            @click="clickItem(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="menu-right">
      <div
        class="barItem"
        :class="index == activeNum ? 'active' : ''"
        v-for="(item, index) in SecondNavBarData"
        :key="index"
        @click="clickSecondBarItem(index)"
        :style="itemWidth == 0 ? '' : 'width:' + itemWidth + 'px;'"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTag: {
      type: Object,
      default() {
        return {}
      }
    },
    sortList: {
      type: Array,
      default() {
        return []
      }
    },
    SecondNavBarData: {
      type: Array,
      default() {
        return []
      }
    },
    itemWidth: {
      type: Number,
      default() {
        return 40
      }
    },
    currentTag: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 是否显示分类选择框
      isSortPopShow: false,
      //  isSortPopShow: true
      activeNum: 0
    }
  },
  methods: {
    // pop框展示时的回调
    showSortPop() {
      // 判断是否有sortList数据
      if (this.sortList.length == 0) {
        this.$emit('getSortList')
      }
    },

    // 点击分类item的回调
    clickItem(item) {
      // console.log(item)
      this.$emit('clickSortBoxItem', item)
      this.isSortPopShow = false
    },
    clickSecondBarItem(index) {
      if (this.activeNum == index) {
        return
      }

      this.activeNum = index
      // 将点击事件发射出去 供使用改组件接收事件使用
      this.$emit('clickSecondBarItem', index)
    }
  }
}
</script>
<style lang="less" scoped>
.musiclist-menu {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .sort-box {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transform: scale(0.9);
  }

  .sort-box i {
    font-size: 12px;
  }

  .tips {
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 20px 0;
    color: rgb(145, 145, 145);
  }
  .menu-right {
    display: flex;
    .navBar {
      display: flex;
      flex-wrap: wrap;
    }

    .barItem {
      margin: 4px -2px;
      padding: 6px 10px;
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
}
</style>
