<template>
  <div class="comment">
    <h2>热门评论</h2>
    <div v-if="hotComments">
      <div class="comment-item" v-for="item in hotComments" :key="item.commentId">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="item.user.avatarUrl" alt="" />
        </div>

        <div class="comment-content">
          <div class="content-top">
            <!-- 名字 -->
            <div class="user-name">{{ item.user.nickname }}: </div>
            <div class="user-comment">{{ item.content }}</div>
          </div>
          <div class="content-bottom">
            <!-- 时间 -->
            <div>{{ item.timeStr }}</div>
            <!-- 点赞 -->
            <div>
              <i class="iconfont icon-good"></i>
              {{ item.likedCount }}
              </div>
          </div>
        </div>
      </div>
    </div>
    <h2>最新评论</h2>
    <div v-for="item in comments" :key="item.commentId">
      <div class="comment-item" v-for="item in hotComments" :key="item.commentId">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="item.user.avatarUrl" alt="" />
        </div>

        <div class="comment-content">
          <div class="content-top">
            <!-- 名字 -->
            <div class="user-name">{{ item.user.nickname }}: </div>
            <div class="user-comment">{{ item.content }}</div>
          </div>
          <div class="content-bottom">
            <!-- 时间 -->
            <div>{{ item.timeStr }}</div>
            <!-- 点赞 -->
            <div>
              <i class="iconfont icon-good"></i>
              {{ item.likedCount }}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotComments: {
      type: Array,
      default: () => []
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.comment {
  margin: 30px auto;
  width: 70%;
  .comment-item {
    display: flex;
    margin: 10px 0;
    font-size: 10px;
  }
  .comment-content {
    flex: 1;
    margin-left: 1rem;
    .content-top {
      display: flex;
      .user-name {
        color: #3498db;
        cursor: pointer;
        min-width: 100px;
      }
      .user-comment{
        
      }
    }
    .content-bottom {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      color: #bdc3c7;
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
