<template>
  <div class="calendar">
    <span>{{ time }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    time() {
      let dd = new Date().getDate()
      return dd
    }
  }
}
</script>
<style lang="less" scoped>
.calendar {
    width: 100px;
    height: 80px;
    border: 5px #8e44ad solid;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #8e44ad;
    position: relative;
    span {
      position: relative;
      padding-top: 5px;
      &::before {
        content: '';
        display: block;
        width: 60px;
        height: 5px;
        border-radius: 5px;
        position: absolute;
        background: #8e44ad;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &::before {
      content: '';
      width: 5px;
      height: 20px;
      background: #8e44ad;
      position: absolute;
      top: -15px;
      left: 15px;
      border-radius: 3px;
    }
    &::after {
      content: '';
      width: 5px;
      height: 20px;
      background: #8e44ad;
      position: absolute;
      top: -15px;
      right: 15px;
      border-radius: 3px;
    }
  }
</style>
