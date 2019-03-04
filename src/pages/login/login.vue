<template>
  <div @touchmove.prevent style="height: 100%;">
    <v-header :showLeft="false" :showRight="false" title="登录"></v-header>
    <a href="#" class="to-register-link" @click="toRegisterLink">注册</a>
    <div class="content">
      <img src="../../common/image/logo.png" alt="" class="login-img">
      <div class="login-form">
        <div class="form-item">
          <i class="icon-shouji1"></i>
          <span class="phone-code" @click="showAreaList">+{{currentPhoneCode}}</span>
          <input type="text" class="phone-input" placeholder="请输入手机号码" v-model="loginForm.phone">
        </div>
        <popup ref="areaList" position="bottom" closeOnClickMask>
          <div class="area-list">
            <scroll class="area-list-scroll" :data="areaList">
              <ul>
                <li v-for="(item, index) in areaList" :key="index" @click="getAreaData(item)">{{item.name}}</li>
              </ul>
            </scroll>
          </div>
        </popup>
        <div class="form-item">
          <i class="icon-mima"></i>
          <input type="password" class="password-input" placeholder="请输入密码" v-model="loginForm.password">
        </div>
        <div class="operate-btns">
          <p class="wx-login">微信登录</p>
          <p class="forget-password" @click="toForgetPasswordLink">忘记密码？</p>
        </div>
        <div class="login-btn-container">
          <button class="login-btn" @click="toDoLogin">立即登录</button>
        </div>
        <div class="protocol-content" @click="protocolReaded = !protocolReaded">
          <p class="protocol-checkbox">
            <span :style="{backgroundColor: (protocolReaded ? '#fc9027' : '#fff')}"></span>
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
  import Scroll from 'components/scroll/scroll'
  import Popup from 'components/popup/popup'
  import {doLogin} from 'api/eat'
  import {getBaiduLocation} from 'api/common.js'
  import Toast from 'components/toast/'
  import {patterns, validatePassword} from 'common/js/rules'
  export default {
    name: 'app',
    components: {
      VHeader,
      Scroll,
      Popup
    },
    data () {
      return {
        protocolReaded: false,
        loginForm: {
          phone: '',
          password: ''
        },
        areaList: [],
        currentPhoneCode: ''
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
      },
      verifyPhone () {
        let reg = patterns.phoneFF.pattern
        if (this.loginForm.phone && reg.test(this.loginForm.phone)) {
          return true
        } else {
          Toast.fail('请输入正确的手机号码！')
          return false
        }
      },
      toDoLogin () {
        // 验证手机号码，测试需要登陆的时候可以先注释该行代码
        // if (!this.verifyPhone()) {
        //   return
        // }
        // 验证密码
        if (!validatePassword(this.loginForm.password)) {
          return
        }
        // 验证是否勾选
        if (!this.protocolReaded) {
          Toast.fail('请阅读并同意《微米用户服务协议》！')
          return
        }
        let ajaxData = {
          phone: '+' + this.currentPhoneCode + this.loginForm.phone,
          password: this.loginForm.password
        }
        doLogin(ajaxData).then(rs => {
          Toast.success(rs.resultDesc)
          let userKey = rs.resultData.userKey
          let createTime = rs.resultData.createTime
          window.localStorage.setItem('userKey', userKey)
          window.localStorage.setItem('createTime', createTime)
          console.log(this.$router)
          this.$router.go(-1)
        })
      },
      getPhoneCode () {
        getBaiduLocation().then(rs => {
          this.areaList = rs.resultData
          this.currentPhoneCode = this.areaList[0].code
        })
      },
      showAreaList () {
        this.$refs.areaList.show()
      },
      getAreaData (data) {
        this.currentPhoneCode = data.code
      }
    },
    mounted () {
      this.getPhoneCode()
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
      .area-list {
        background: #efefef;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40%;
      }
      .area-list li {
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
      }
      .area-list-scroll {
        position: absolute;
        top: 0.7rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
      }
      .phone-code {
        position: absolute;
        left: 0.55rem;
        top: 0;
        display: inline-block;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-right: 0.15rem;
        border-right: 1px solid #d0cdcd;
        font-size: 14px;
        color: #000;
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
        width: 1.65rem;
        padding: 0 1.5rem 0 1.4rem;
      }
      .icon-shouji1, .icon-mima{
        position: absolute;
        left: 0.24rem;
        top: 0.15rem;
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
