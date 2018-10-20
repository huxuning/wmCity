<template>
  <div class="timer-wrapper">
    <span v-show="state==='init'">获取验证码</span>
    <loading v-show="state==='wait'&&!isStarted" class="loading" type="circle"></loading>
    <span class="timer-num" v-show="state==='timing'">({{currentTime}})</span>
    <span v-show="state==='finished'">重新获取</span>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  export default {
    name: 'timer',
    components: {
      Loading
    },
    props: {
      time: Number
    },
    data () {
      return {
        state: 'init',
        isStarted: false,
        defaultTime: 60,
        currentTime: 0,
        index: 0
      }
    },
    created () {
      this.currentTime = this.time || this.defaultTime
    },
    methods: {
      setState (state) {
        if (this.state === 'timing' && state === 'wait') {
          return
        }
        this.state = state
      },
      _setInit () {
        this.isStarted = false
        this.currentTime = this.time || this.defaultTime
      },
      start () {
        if (!this.isStarted) {
          this.isStarted = true
          this.setState('timing')
          this.interval = setInterval(() => {
            if (this.currentTime > 1) {
              this.currentTime--
            } else {
              this.stop()
              this.index++
              this.$emit('on-finish', this.index)
              this.setState('finished')
              this._setInit()
            }
          }, 1000)
        }
      },
      stop () {
        clearInterval(this.interval)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .timer-wrapper {
    display: inline-block;
    font-size: $font-size-mid-l;
    .loading {
      position: relative;
      top: -3px;
      display: inline-block;
    }
    .timer-num {
      font-size: $font-size-mid-l;
      font-family: arial;
    }
  }
</style>