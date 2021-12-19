<template>
  <div id="app">
    <router-view class="app-view" />
  </div>
</template>
<script>
export default {
    async created(){
      await this.$store.dispatch('login/refreshLogin')
   }
}
</script>
<style lang="less">
#app {
  
}
</style>
