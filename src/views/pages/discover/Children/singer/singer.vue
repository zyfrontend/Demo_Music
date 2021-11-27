<template>
  <div class="singer">
    <div class="singer-category">
      <!-- 歌手分类选择 -->
      <div class="selectors">
        <div class="selectorItem">
          <div class="title">语种：</div>
          <category-menu class="secondNavBar" @clickSecondBarItem="areaItem" :menuData="languageSort"></category-menu>
        </div>
        <div class="selectorItem">
          <div class="title">分类：</div>
          <category-menu class="secondNavBar" @clickSecondBarItem="typeItem" :menuData="typeSort"></category-menu>
        </div>
        <div class="selectorItem">
          <div class="title">筛选：</div>
          <category-menu class="secondNavBar" @clickSecondBarItem="initialItem" :menuData="initialSort"></category-menu>
        </div>
      </div>
    </div>
    <div class="singer-card">
      <music-card @clickMusicCardItem="$warn()" v-for="item in singerList" :key="item.id" :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MusicCard from '@/components/music-card/src/musicCard.vue'
import CategoryMenu from '@/components/category-menu'
import SingerCategory from './components/singer-category.vue'
export default {
  components: {
    SingerCategory,
    MusicCard,
    CategoryMenu
  },
  data() {
    return {
      languageSort: [
        { area: -1, name: '全部' },
        { area: 7, name: '华语' },
        { area: 96, name: '欧美' },
        { area: 8, name: '日本' },
        { area: 16, name: '韩国' },
        { area: 0, name: '其它' }
      ],
      typeSort: [
        { type: -1, name: '全部' },
        { type: 1, name: '男歌手' },
        { type: 2, name: '女歌手' },
        { type: 3, name: '乐队' }
      ],
      initialSort: [
        { initial: -1, name: '热门' },
        { initial: 'a', name: 'A' },
        { initial: 'b', name: 'B' },
        { initial: 'c', name: 'C' },
        { initial: 'd', name: 'D' },
        { initial: 'e', name: 'E' },
        { initial: 'f', name: 'F' },
        { initial: 'g', name: 'G' },
        { initial: 'h', name: 'H' },
        { initial: 'i', name: 'I' },
        { initial: 'j', name: 'J' },
        { initial: 'k', name: 'K' },
        { initial: 'l', name: 'L' },
        { initial: 'm', name: 'M' },
        { initial: 'n', name: 'N' },
        { initial: 'o', name: 'O' },
        { initial: 'p', name: 'P' },
        { initial: 'q', name: 'Q' },
        { initial: 'r', name: 'R' },
        { initial: 's', name: 'S' },
        { initial: 't', name: 'T' },
        { initial: 'u', name: 'U' },
        { initial: 'v', name: 'V' },
        { initial: 'w', name: 'W' },
        { initial: 'x', name: 'X' },
        { initial: 'y', name: 'Y' },
        { initial: 'z', name: 'Z' },
        { initial: 0, name: '#' }
      ]
    }
  },
  methods: {
    // 事件处理
    // 地区
    areaItem(index) {
      this.$store.commit('discover/changeSingerArea', this.languageSort[index].area)
      // 先清空list 再请求数据
      this.$store.commit('discover/changeSingerList', [])
      this.$store.commit('discover/changeSingerCurrentPage', 1)
      this.$store.dispatch('discover/getSingerList')
    },
    // 分类
    typeItem(index) {
      this.$store.commit('discover/changeSingerType', this.typeSort[index].type)
      // 先清空list 再请求数据
      this.$store.commit('discover/changeSingerCurrentPage', 1)
      this.$store.commit('discover/changeSingerList', [])
      this.$store.dispatch('discover/getSingerList')
    },
    // 筛选
    initialItem(index) {
      this.$store.commit('discover/changeSingerInitial', this.initialSort[index].initial)
      // 先清空list 再请求数据
      this.$store.commit('discover/changeSingerCurrentPage', 1)
      this.$store.commit('discover/changeSingerList', [])
      this.$store.dispatch('discover/getSingerList')
    }
  },
  computed: {
    ...mapState('discover', { singerList: state => state.singerList })
  },
  created() {
    this.$store.dispatch('discover/getSingerList')
  }
}
</script>
<style lang="less" scoped>
.singer {
  .singer-card {
    display: flex;
    flex-wrap: wrap;
  }
  .singer-category {
    display: flex;
    justify-content: center;
    .selectorItem {
      display: flex;
    }
    .title {
      font-size: 12px;
      width: 40px;
      line-height: 33px;
    }
    .secondNavBar {
      width: calc(100% - 60px);
    }
  }
}
</style>
