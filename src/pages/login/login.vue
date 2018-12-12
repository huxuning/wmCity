<template>
  <div @touchmove.prevent style="height: 100%;">
    <v-header :showLeft="false" :showRight="false" title="登录"></v-header>
    <a href="#" class="to-register-link" @click="toRegisterLink">注册</a>
    <div class="content">
      <img src="../../common/image/logo.png" alt="" class="login-img">
      <div class="login-form">
        <div class="form-item">
          <i class="icon-shouji1"></i>
          <input type="text" class="phone-input" placeholder="请输入手机号码">
        </div>
        <div class="form-item">
          <i class="icon-mima"></i>
          <input type="password" class="password-input" placeholder="请输入密码">
        </div>
        <div class="operate-btns">
          <p class="wx-login">微信登录</p>
          <p class="forget-password" @click="toForgetPasswordLink">忘记密码？</p>
        </div>
        <div class="login-btn-container">
          <button class="login-btn">立即登录</button>
        </div>
        <div class="protocol-content" @click="protocolReaded = !protocolReaded">
          <p class="protocol-checkbox">
            <span v-if="protocolReaded" :style="{backgroundColor: (protocolReaded ? '#fc9027' : '#fff')}"></span>
          </p>
          我已阅读并同意
          <a href="#" class="protocol-link">《微米用户服务协议》</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  export default {
    name: 'app',
    components: {
      VHeader
    },
    data () {
      return {
        protocolReaded: false
      }
    },
    methods: {
      toRegisterLink () {
        this.$router.push({
					path: '/Register',
					query: {
					}
				})
      },
      toForgetPasswordLink () {
        this.$router.push({
					path: '/ForgetPassword',
					query: {
					}
				})
      }
    },
    mounted () {
    
    },
    created () {
    },
    watch: {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~common/style/mixin.scss';
  #app{
    height: 100%;
  }
  .to-register-link{
    position: absolute;
    top: 0.3rem;
    left: auto;
    right: 0.3rem;
    z-index: 10;
    color: #fff;
    font-size: 16px;
  }
  .content{
    height: 100%;
    background: url(../../common/image/login_bg.png) no-repeat;
    background-size: cover;
    text-align: center;
    font-size: 14px;
    .login-img{
      width: 1.5rem;
      margin-top: 1.5rem;
    }
    .login-form{
      margin-top: 0.8rem;
      .form-item{
        margin-bottom: 0.24rem;
        display: inline-block;
        position: relative;
      }
      .phone-input, .password-input{
        width: 3.91rem;
        height: 0.6rem;
        border-radius: 0.6rem;
        background: #fff;
        border: none;
        outline: none;
        padding-left: 0.64rem;
      }
      .phone-input{
        width: 2.41rem;
        padding-right: 1.5rem;
      }
      .icon-shouji1, .icon-mima{
        position: absolute;
        left: 0.24rem;
        top: 0.18rem;
        color: #666;
        font-size: 18px;
      }
      .get-code{
        position: absolute;
        top: 0.08rem;
        right: 0.15rem;
        width: 1.2rem;
        height: 0.44rem;
        color: #fc9027;
        border: 1px solid #fc9027;
        outline: none;
        background: #fff;
        border-radius: 0.44rem;
        font-size: 12px;
      }
      .operate-btns{
        display: inline-block;
        width: 4.07rem;
        margin-top: 0.06rem;
        margin-bottom: 0.3rem;
        overflow: hidden;
        color: #fff;
      }
      .wx-login{
        float: left;
      }
      .forget-password{
        float: right;
      }
      .login-btn-container{
        margin-bottom: 0.3rem;
      }
      .login-btn{
        width: 4.55rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.6rem;
        color: #fff;
        background: #fc9027;
        border: none;
        outline: none;
        font-size: 16px;
      }
      .protocol-content{
        color: #fff;
      }
      .protocol-checkbox{
        display: inline-block;
        width: 0.18rem;
        height: 0.18rem;
        border: 1px solid #d0cdcd;
        border-radius: 0;
        background: #fff;
        margin-right: 0.11rem;
        position: relative;
        top: 0.02rem;
        span{
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          position: relative;
          top: -0.03rem;
        }
      }
      .protocol-link{
        color: #fc9027;
      }
    }
  }
</style>
