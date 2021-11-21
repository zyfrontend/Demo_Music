<template>
  <div class="detail-header">
    <!-- 歌单封面 -->
    <div class="detail-avatar">
      <img :src="headerData.coverImgUrl" alt="" />
    </div>
    <!-- 歌单信息 -->
    <div class="detail-info">
      <!-- title -->
      <div class="title">
        <div class="title-tag">歌单</div>
        <div class="title-content">{{ headerData.name }}</div>
      </div>
      <!-- 创建人 -->
      <div class="user">
        <div class="user-avatar">
          <img :src="headerData.creator && headerData.creator.avatarUrl" alt="" />
        </div>
        <div class="user-name">
          {{ headerData.creator && headerData.creator.nickname }}
        </div>
        <div class="create-time">{{ headerData.createTime | formatYearMonthDay }}创建</div>
      </div>
      <!-- btn -->
      <div class="buttons">
        <div class="button-item play-all">
          <i class="iconfont icon-bofang play-all"></i>
          <span>播放全部</span>
        </div>
        <div class="button-item" v-if="!isCreated">
          <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
          <span>{{ isSub ? '已收藏' : '收藏' }}</span>
        </div>
        <div class="button-item">
          <i class="iconfont icon-zhuanfa"></i>
          <span>分享</span>
        </div>
      </div>
      <!-- 标签 -->
      <div class="tags">
        标签：
        <div class="tag-item" v-for="(item, index) in headerData.tags" :key="index">
          {{ item }}
        </div>
        <div v-if="(headerData.tags && headerData.tags.length) == 0">暂无标签</div>
      </div>
      <!-- 歌曲数量 播放数量 -->
      <div class="other-info">
        <div class="music-num">歌曲 : {{ headerData.trackCount | getCount }}</div>
        <div class="play-count">播放 : {{ headerData.playCount | getCount }}</div>
      </div>
      <!-- 简介 -->
      <div class="desc">
        简介 :
        {{ headerData.description ? headerData.description : '暂无简介' }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatYearMonthDay, getCount } from '@/utils'
export default {
  props: {
    headerData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 用户是否收藏了当前歌单
      isSub: false,
      // 是否是用户创建的歌单
      isCreated: false
    }
  },
  filters: {
    getCount,
    formatYearMonthDay
  }
}
</script>
<style lang="less" scoped>
.detail-header {
  display: flex;
  padding: 25px 15px;
  align-items: center;
  .detail-avatar {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 15px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background: url('~assets/img/imgLoading.png') no-repeat;
      background-size: contain;
      z-index: -1;
    }
    img {
      width: 100%;
    }
  }
  .detail-info {
    width: calc(100% - 200px);
    // title
    .title {
      display: flex;
      align-items: center;
      .title-tag {
        font-size: 12px;
        color: #ec4141;
        border: 1px solid #ec4141;
        padding: 1px 2px;
        border-radius: 2px;
        margin-right: 5px;
        transform: scale(0.8);
      }
      .title-content {
        font-size: 20px;
        font-weight: 600;
        color: #373737;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
      }
    }
    // user
    .user {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 12px;
      .user-avatar {
        height: 25px;
        width: 25px;
        margin-right: 8px;
        img {
          width: 100%;
          border-radius: 50%;
        }
        .user-name {
          color: #6191c2;
          margin-right: 8px;
          cursor: pointer;
        }
      }
      .create-time {
        transform: scale(0.9);
      }
    }
    // btn
    .buttons {
      margin: 8px 0 0 -5px;
      display: flex;
      .button-item {
        font-size: 12px;
        padding: 8px 15px;
        border: 1px solid #ddd;
        border-radius: 20px;
        transform: scale(0.9);
        i {
          font-size: 12px;
          margin-right: 3px;
          transform: scale(0.9);
        }
      }
      .play-all {
        background-color: #ec4141;
        color: white;
      }
    }
    // 标签
    .tags {
      margin: 8px 0 0 -30px;
      display: flex;
      font-size: 12px;
      transform: scale(0.9);
      .tag-item {
        color: #6191c2;
        margin-right: 5px;
      }
    }
    .other-info {
      margin: 5px 0 0 -30px;
      display: flex;
      font-size: 12px;
      transform: scale(0.9);
      .music-num {
        margin-right: 13px;
      }
    }
    .desc {
      margin: 5px 0 0 -30px;
      font-size: 12px;
      transform: scale(0.9);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
