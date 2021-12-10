<template>
  <div class="Video">
      <h2>Video</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="less" scoped>
.Video {
  padding: 0 auto;
  overflow: scroll;
  height: calc(100vh - 120px);
  /* overflow: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>