<template>
  <div class="header-bar">
    <div class="left">
      <div class="title" @click="$router.replace('/')">Music</div>
      <div class="buttons">
        <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
    </div>
    <div class="center"></div>
    <div class="right">
      <!-- <div class="login-btn" @click="dialogVisible = true" type="info">登录</div> -->

      <!-- 按钮 -->
      <!-- 点击触发显示登录狂 -->

      <div v-if="!$store.state.login.isLogin" class="login-btn" @click="dialogVisible = true" type="info">登录</div>
      <div v-else>
        <el-popover placement="bottom" trigger="click" content="退出登录">
        <div class="user-info" slot="reference" >
          <div class="user-img"><img :src="$store.state.login.profile.avatarUrl" alt="" /></div>
          <div class="nick-name">{{ $store.state.login.profile.nickname }}</div>
        </div>
        <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
      </el-popover>
      </div>
    </div>
    <div>
      <el-dialog :destroy-on-close="true" title="手机登录" :visible.sync="dialogVisible" width="30%" :before-close="handleLogin">
        <el-form label-width="70px" :rules="rules" :model="account">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="account.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="account.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: {
        phone: '18814351869',
        password: 'zzy0226zzy233'
      },
      dialogVisible: false,
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '用户名必须是5-10个以上数字或字母'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码必须是3个以上的数字或字母'
          }
        ]
      }
    }
  },
  methods: {
    handleLogin(done) {
      done()
      this.account.phone = ''
      this.account.password = ''
    },
    login() {
      this.$store.dispatch('login/loginByCellphone', this.account)
      this.dialogVisible = false
    },
    logout() {
      this.$store.dispatch('login/logout')
      
    }
  }
}
</script>
<style lang="less" scoped>
.header-bar {
  display: flex;
  width: 100%;
  background: #8e44ad;
  height: 65px;
  align-items: center;
  padding: 0 3rem;
  .buttons {
    color: rgb(235, 235, 235);
    /* display: flex; */
    height: 22px;
    display: flex;
  }
  .left {
    display: flex;
    .title {
      color: white;
      text-align: center;
      cursor: pointer;
    }
  }
  .center {
    flex: 1;
  }
  .buttons i {
    background-color: #9b59b6;
    font-size: 12px;
    transform: scale(0.8);
    padding: 5px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    margin: 0 3px;
  }
  .right {
    .login-btn {
      color: white;
      padding: 5px 10px;
      border-radius: 10px;
      background: #9b59b6;
      cursor: pointer;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    .user-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .nick-name {
      margin-left: 10px;
      font-size: 10px;
      color: white;
    }
  }

  .login-card {
    width: 500px;
    height: 500px;
    background: red;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
  }
}
</style>
