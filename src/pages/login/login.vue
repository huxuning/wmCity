<template>
  <div @touchmove.prevent style="height:100%">
		<v-header title="登录"  @clickBack="goback"></v-header>
    <div class="content">
      <p class="welcome-title">欢迎登陆微米城市</p>
      <div class="login-form">
        <input type="text" placeholder="请输入手机号码" class="phone-input">
        <p class="phone-tip">未注册的手机号码验证后自动创建微米账户</p>
        <button class="get-code">获取短信验证码</button>
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

      }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    },
    mounted () {
    
    },
    created () {
    },
    watch: {
      '$route': function (to, from) {
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/mixin.scss';
  .content{
    padding: 0 0.5rem;
    .welcome-title{
      font-size: 18px;
      margin-top: 2rem;
    }
    .login-form{
      margin-top: 1rem;
      text-align: center;
      .phone-input{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        border: 0;
        border-bottom: 1px solid #f3f3f3;
        padding-left: 0.1rem;
        outline: none;

      }
      .phone-tip{
        margin-top: 0.1rem;
        padding-left: 0.1rem;
        font-size: 12px;
        color: #ccc;
        text-align: left;
      }
      .get-code{
        width: 96%;
        background: #f9ab0d;
        border: 0;
        outline: none;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        text-align: center;
        color: #fff;
        border-radius: 0.8rem;
        margin-top: 0.8rem;
        font-size: 14px;
      }
    }
  }
</style>
