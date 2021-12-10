<template>
  <div class="musicdetail" :class="isMusicDetailCardShow ? '' : 'hide'">
    <!-- 关闭卡片按钮 -->
    <div class="closeCard" @click="closeCard">
      <i class="iconfont icon-arrow-down-bold"></i>
    </div>
    <!-- 详情 -->
    <div class="detail-container">
      <div class="detail-top">
        <div class="top-left">
          <!-- 封面 -->
          <div class="discContainer">
            <div class="needle" :class="$store.state.player.isPlay ? 'needleRotate' : ''" ref="needle">
              <img src="~assets/img/MusicDetailCard/needle.png" alt="" />
            </div>
            <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
            <div class="disc discAnimation" :class="[$store.state.player.isPlay ? '' : 'pause']" ref="disc">
              <img src="~assets/img/MusicDetailCard/disc.png" alt="" />
              <img src="~assets/img/test.jpg" alt="" class="musicAvatar" v-if="!musicDetail.al" />
              <img :src="musicDetail.al.picUrl" alt="" class="musicAvatar" v-else />
            </div>
          </div>
        </div>
        <div class="top-right" v-if="!cleanCard && musicDetail.name">
          <div class="title">
            <div class="musicName">{{ musicDetail.name }}</div>
            <div class="album" @click="goToDetailPage('album', musicDetail.al.id)">
              {{ musicDetail.al.name}}
            </div>
            <div class="singer" @click="goToDetailPage('singerDetail', musicDetail.ar[0].id)">
              {{ musicDetail.ar[0].name}}
            </div>
          </div>
          <div class="musiclyric">
            <lyrics-scroll :lyric="lyric"></lyrics-scroll>
          </div>
        </div>
      </div>
      <div class="detail-bottom">
        <comment :hotComments="hotComments" :comments="comments"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LyricsScroll from '@/components/lyric-scroll'
import Comment from '@/components/comment'
// 定时器名称
let timer
export default {
  components: { LyricsScroll, Comment },
  data() {
    return {
      // 是否显示歌曲详情卡片
      isMusicDetailCardShow: false,
      //   当前歌曲信息
      // musicDetail: {},
      //   歌词
      // lyric: [[0, '正在加载歌词']],
      // 是否删除卡片渲染的内容
      cleanCard: true
    }
  },
  methods: {
    // 关闭卡片
    closeCard() {
      this.$store.commit('player/changeMusicDetailCardState')
    }
  },
  computed: {
    ...mapState('player', {
      musicDetail: state => state.musicDetail
    }),
    ...mapState('player', {
      lyric: state => state.lyric
    }),
    ...mapState('player', {
      hotComments: state => state.hotComments
    }),
    ...mapState('player', {
      comments: state => state.comments
    })
  },
  watch: {
    // 显示隐藏歌曲详情卡片
    '$store.state.player.isMusicDetailCardShow'(isMusicDetailCardShow) {
      this.isMusicDetailCardShow = isMusicDetailCardShow
      this.cleanCard = false

      // 请求评论
      //  this.$store.dispatch('player/getMusicComment', this.$store.state.player.musicId)
    },
    '$store.state.player.musicId'(musicId) {
      // 更新当前歌曲信息
      // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
      this.$store.commit('player/changeLyric', [[0, '正在加载歌词']])
      this.$store.dispatch('player/getLyric', musicId)
      this.$store.dispatch('player/getMusicComment', this.$store.state.player.musicId)
    }
  }
}
</script>
<style lang="less" scoped>
.musicdetail {
  overflow: scroll;
  position: fixed;
  width: 100%;
  // height: calc(100vh - 55px);
  height: calc(100vh - 55px);
  bottom: 55px;
  left: 0;
  z-index: 1000;
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
  .closeCard .iconfont {
    position: absolute;
    top: 15px;
    left: 35px;
    font-size: 21px !important;
  }
  .detail-top {
    display: flex;
    justify-content: center;
    .top-left {
      width: 220px;
      margin: 0 30px 0 -40px;
    }
    .top-right {
      width: 350px;
      padding: 70px 0;
      .title {
        width: 100%;
        text-align: center;
        font-size: 12px;
        margin: 30px 0 15px;
        color: rgb(145, 145, 145);
        div {
          margin: 7px 0;
        }

        .musicName {
          font-size: 23px;
          color: rgb(22, 22, 22);
        }
        .album,
        .singer {
          cursor: pointer;
        }
      }
    }
    .discContainer {
      margin-top: 60px;
      width: 220px;
      position: relative;
    }
    .needle {
      position: relative;
      left: 50%;
      width: 88px;
      height: 72px;
      z-index: 10000;
      transition: all 1s;
      transform-origin: 5.3px 5.3px;
    }

    .needle img {
      width: 100%;
    }

    .needleRotate {
      transform-origin: 5.3px 5.3px;
      transform: rotate(22deg);
    }
    .disc {
      width: 220px;
      height: 220px;
      position: relative;
      top: -12px;
    }

    .disc img:nth-child(1) {
      width: 100%;
    }

    .disc .musicAvatar {
      position: absolute;
      top: 35px;
      left: 35px;
      width: 150px;
      z-index: -1;
    }
    /* 碟子设置旋转动画 */
    .discAnimation {
      /* infinite动画无限循环 */
      animation: disc 25s linear infinite;
      /* 动画延迟一秒 */
      animation-delay: 0.8s;
    }

    @keyframes disc {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
.hide {
  bottom: calc(-100vh + 55px);
}
</style>
