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
            <div class="needle" :class="$store.state.isPlay ? 'needleRotate' : ''" ref="needle">
              <img src="~assets/img/MusicDetailCard/needle.png" alt="" />
            </div>
            <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
            <div class="disc" :class="[$store.state.isPlay ? '' : 'pause', $store.state.isMusicLoad ? '' : 'discAnimation']" ref="disc">
              <img src="~assets/img/MusicDetailCard/disc.png" alt="" />
              <img src="~assets/img/test.jpg" alt="" class="musicAvatar" v-if="!musicInfo.al" />
              <img :src="musicInfo.al.picUrl" alt="" class="musicAvatar" v-else />
            </div>
          </div>
        </div>
        <div class="top-right" v-if="!cleanCard && musicInfo.name">
          <div class="title">
            <div class="musicName">{{ musicInfo.name }}</div>
            <div class="album" @click="goToDetailPage('album', musicInfo.al.id)">
              {{ musicInfo.al.name }}
            </div>
            <div class="singer" @click="goToDetailPage('singerDetail', musicInfo.ar[0].id)">
              {{ musicInfo.ar[0].name }}
            </div>
          </div>
          <div class="musiclyric">
            <lyrics-scroll :lyric="lyric"></lyrics-scroll>
          </div>
        </div>
      </div>
      <div class="detail-bottom">
        
      </div>
    </div>
  </div>
</template>

<script>
import { parseLyric } from '@/utils'
import LyricsScroll from '@/components/lyric-scroll'
// 定时器名称
let timer
export default {
  components: { LyricsScroll },
  data() {
    return {
      // 是否显示歌曲详情卡片
      isMusicDetailCardShow: false,
      //   当前歌曲信息
      musicInfo: {},
      //   歌词
      lyric: [[0, '正在加载歌词']],
      //当前评论页数
      currentCommentPage: 1,
      // 评论数据
      comment: {},
      // 是否删除卡片渲染的内容
      cleanCard: true
    }
  },
  methods: {
    // 关闭卡片
    closeCard() {
      this.$store.commit('changeMusicDetailCardState')
    },
    //请求并处理歌词数据
    async getLyric(id) {
      let res = await this.$request("/lyric", { id });
      //   console.log(res);
      let lyrics = res.data.lrc.lyric;
      // 对获取到的歌词进行处理
      let arr = lyrics.split("\n");
      let array = [];
      // let obj = {};
      let time = "";
      let value = "";
      let result = [];

      //去除空行
      arr.forEach((item) => {
        if (item != "") {
          array.push(item);
        }
      });
      arr = array;
      arr.forEach((item) => {
        time = item.split("]")[0];
        value = item.split("]")[1];
        //去掉时间里的中括号得到xx:xx.xx
        var t = time.slice(1).split(":");
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });

      this.lyric = result;
      // console.log(this.lyric);
    },
  },
  watch: {
    // 显示隐藏歌曲详情卡片
    '$store.state.isMusicDetailCardShow'(isMusicDetailCardShow) {
      this.isMusicDetailCardShow = isMusicDetailCardShow
      //   性能优化
      //如果卡片没有展示就不发送请求和渲染里面的内容
      //   删除定时器 避免用户在关闭卡片的1s内又打开卡片 导致展示内容被删除
      clearTimeout(timer)
      this.cleanCard = false
      if (isMusicDetailCardShow && !this.comment.comments && this.$store.state.musicId != '') {
        console.log('请求歌词和评论')
        this.getLyric(this.$store.state.musicId)
      }
      //   当卡片关闭时 延迟 3s再删除里面渲染的内容 提升体验
      else if (isMusicDetailCardShow == false) {
        timer = setTimeout(() => {
          this.cleanCard = true
        }, 3000)
      }
    },

    // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
    '$store.state.musicId'(musicId) {
      // 更新当前歌曲信息

      this.musicInfo = this.$store.state.musicList[this.$store.state.currentIndex + 1]
      // 清空歌词
      this.lyric = [[0, "正在加载歌词"]];
      this.getLyric(musicId);
    }
  }
}
</script>
<style lang="less" scoped>
.musicdetail {
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
