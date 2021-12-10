<template>
  <div id="app">
    <router-view class="app-view" />
  </div>
</template>
<script>
export default {
  created(){
    if(window.localStorage.getItem('token')){
      this.$store.dispatch('login/recoverStore')
    }
  }
}
</script>
<style lang="less">
#app {
  
}
</style>
