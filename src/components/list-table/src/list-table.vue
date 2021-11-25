<template>
  <div class="list-table">
    <div class="listCover">
      <img :src="officialItem.coverImgUrl || officialItem.cover" alt="" />
    </div>
    <div class="list">
      <table>
        <tr class="listRows" v-for="(item, index) in officialItem.tracks.slice(0, 5)" :key="item.id" @click="handleTrClick(officialItem.id || item.id, index)">
          <td class="index">{{ index + 1 }}</td>
          <td class="musicName">{{ item.name }}</td>
          <td class="singer">{{ item.ar[0].name }}</td>
        </tr>
      </table>
      <div class="checkAll" @click="$warn()">查看全部 <i class="iconfont icon-arrow-right-bold"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    officialItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleTrClick(id, index){
      
      this.$emit('handleTrClick', {id, index})
    }
  },
  
}
</script>
<style lang="less" scoped>
.list-table {
  display: flex;
  margin: 20px 0 50px 0;
  .listCover {
    width: 150px;
    height: 150px;
    margin-right: 20px;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .list {
    width: calc(100% - 200px);
    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 5px;
      overflow: hidden;
    }

    .listRows {
      height: 30px;
      font-size: 12px;
      color: rgb(153, 153, 153);
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
    }

    .listRows:nth-child(odd) {
      background-color: #f9f9f9;
    }
    .listRows:hover {
      background-color: #f4f4f4;
    }

    .listRows td {
      transform: scale(0.9);
    }
    .musicName {
      color: rgb(31, 31, 31);
      transform: translate(-5%, -5%) scale(0.9);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 80%;
    }

    .singer {
      text-align: right;
      position: absolute;
      right: 10px;
    }

    .checkAll {
      color: rgb(134, 134, 134);
      font-size: 12px;
      transform: scale(0.9) translateX(-5%);
      width: 100px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }

    .checkAll i {
      font-size: 12px;
    }

    .selectRow {
      background-color: #efefef !important;
    }

    tr {
      cursor: pointer;
    }
  }
}
</style>
