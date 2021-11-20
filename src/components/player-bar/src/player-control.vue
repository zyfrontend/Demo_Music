<template>
  <div class="player-control">
    <control-btn></control-btn>
    <control-progress></control-progress>
  </div>
</template>

<script>
import ControlBtn from './control-btn.vue'
import ControlProgress from './control-progress.vue'
export default {
  components: {
    ControlBtn,
    ControlProgress
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.player-control {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
}
</style>
