<template>
  <div></div>
</template>

<script>
  
  export default {
    name: 'app',
    components: {

    },
    data () {
      return {

      }
    },
    methods: {
      
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
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  .login-wrapper {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: $white;
    .icon-close {
      position: absolute;
      top: .1rem;
      left: .1rem;
      padding: .1rem;
      font-size: $font-size-large-lm;
      color: $color-text-6;
    }
    .cell-wrapper {
      padding: .16rem 0;
    }
    .field-wrapper .field-item {
      height: .6rem;
      line-height: 1.4;
      font-size: $font-size-mid-l;
      color: $color-text-3;
    }
    .login-cotent {
      margin: 2.6rem auto 0;
      width: 4.6rem;
    }
    .icon {
      position: relative;
      top: .16rem;
      font-size: $font-size-large;
      color: $color-theme;
    }
    .logo {
      position: absolute;
      top: .8rem;
      width: 3.88rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .loginBg {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .code {
      width: 1.6rem;
      height: .6rem;
      text-align: center;
      margin-left: .28rem;
      line-height: .6rem;
      border-radius: .06rem;
      overflow: hidden;
      background-color: $color-background;
      .code-img{
        width: 1.6rem;
        height: .6rem;
      }
    }
    .btn-wrapper {
      @include border-retina($color-border-e, top);
      padding-top: .6rem;
      .v-btn {
        line-height: 2.8;
      }
    }
    .link {
      padding: .2rem;
      color: $color-text-9;
      .left {
        float: left;
        line-height: .42rem;
      }
      .right {
        float: right;
        line-height: .42rem;
      }
    }
  }
</style>
