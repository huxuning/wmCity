<template>
  <div @touchmove.prevent style="height: 100%;">
    <v-header showLeft title="忘记密码" @clickBack="goback"></v-header>
    <div class="content">
      <div class="forget-password-form">
        <div class="form-item">
          <i class="icon-shouji1"></i>
          <input type="text" class="phone-input" placeholder="请输入手机号码" v-model="forgetPasswordForm.phone">
          <button class="get-code" @click="getCode" v-if="!countDowning">获取验证码</button>
          <button class="get-code" v-if="countDowning">{{countDownTimeText ? countDownTimeText : countDownTime + 's'}}</button>
        </div>
        <div class="form-item">
          <i class="icon-mima"></i>
          <input type="text" class="code-input" placeholder="请输入验证码" v-model="forgetPasswordForm.phoneCode">
        </div>
        <div class="form-item">
          <i class="icon-mima"></i>
          <input type="password" class="password-input" placeholder="请输入新密码（6-20位数字字母组合）" v-model="forgetPasswordForm.password">
        </div>
        <div class="edit-btn-container">
          <button class="edit-btn" @click="resetPassword">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import {smsCode, retrievePassword} from 'api/eat.js'
  import Toast from 'components/toast/'
  import {patterns, validatePassword, validateNotNull} from 'common/js/rules'
  export default {
    name: 'app',
    components: {
      VHeader
    },
    data () {
      return {
        protocolReaded: false,
        forgetPasswordForm: {
          phone: '',
          password: '',
          phoneCode: ''
        },
        countDowning: false,
        countDownTime: 60,
        countDownTimeText: ''
      }
    },
    methods: {
      goback () {
				this.$router.go(-1)
      },
      encryptData (data) {
        let encrypt = new JSEncrypt()
        encrypt.setPublicKey(window.RSAPublicKey)
        let encryptedData = encrypt.encrypt(data)
        return encryptedData
      },
      getCode () {
        // 验证手机号码，测试需要时可以先注释该行代码
        // if (!this.verifyPhone()) {
        //   return
        // }
        let encryptPhone = this.encryptData(this.forgetPasswordForm.phone)
        let ajaxData = {
          phone: encryptPhone,
          type: 'retrievePassword'
        }
        smsCode(ajaxData).then(rs => {
          Toast.success(rs.resultDesc)

          this.countDowning = !this.countDowning
          let timer = setInterval(() => {
            if (this.countDownTime === 0) {
              this.countDowning = !this.countDowning
              clearInterval(timer)
              return
            }
            this.countDownTime--
            this.countDownTimeText = this.countDownTime + 's'
          }, 1000)
        })
      },
      verifyPhone () {
        let reg = patterns.phoneFF.pattern
        if (this.forgetPasswordForm.phone && reg.test(this.forgetPasswordForm.phone)) {
          return true
        } else {
          Toast.fail('请输入正确的手机号码！')
          return false
        }
      },
      resetPassword () {
        // 验证手机号码，测试需要时可以先注释该行代码
        // if (!this.verifyPhone()) {
        //   return
        // }
        // 验证短信验证码
        if (!validateNotNull(this.forgetPasswordForm.phoneCode)) {
          return
        }
        // 验证密码
        if (!validatePassword(this.forgetPasswordForm.password)) {
          return
        }
        let ajaxData = {
          phone: this.forgetPasswordForm.phone,
          password: this.forgetPasswordForm.password,
          phoneCode: this.forgetPasswordForm.phoneCode
        }
        retrievePassword(ajaxData).then(rs => {
          Toast.success(rs.resultDesc)
          this.$router.go(-1)
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
  @import "~common/style/variable.scss";
  @import '~common/style/mixin.scss';
  .content{
    height: 100%;
    font-size: 14px;
    .forget-password-form{
      padding: 0.2rem 0.3rem 0;
      .form-item{
        height: 0.75rem;
        line-height: 0.74rem;
        @include border-retina($color-border-d, bottom);
      }
      .icon-shouji1, .icon-mima{
        color: #666;
        margin-left: 0.18rem;
        margin-right: 0.15rem;
        font-size: 18px;
      }
      .phone-input, .code-input, .password-input{
        border: none;
        outline: none;
        width: 3.5rem;
      }
      .get-code{
        width: 1.54rem;
        height: 0.44rem;
        line-height: 0.44rem;
        border: none;
        outline: none;
        border-left: 1px solid $color-border-d;
        color: #ff2222;
        background: #fff;
      }
      .edit-btn-container{
        margin-top: 0.4rem;
      }
      .edit-btn{
        width: 100%;
        height: 0.68rem;
        color: #fff;
        border: none;
        outline: none;
        font-size: 16px;
        background: #fc922a;
      }
    }
  }
</style>
