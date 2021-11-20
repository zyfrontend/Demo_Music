<template>
  <div class="banner">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="180px">
        <el-carousel-item v-for="(item, index) in bannerData" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerData: []
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.banner {
  max-width: 1000px;
  .carousel {
    width: 100%;
  }
  .el-carousel {
    margin: auto;
    width: 800px;
  }

  .el-carousel__item {
    border-radius: 10px;
  }

  .el-carousel__item img {
    height: 100%;
  }
}
</style>
