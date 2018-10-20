<template>
  <div class="progress-wrapper" :style="wrapperStyle">
    <div class="percent-filled" :style="percentStyle"></div>
  </div>
</template>

<script>
  const DEFAULT_COLOR = '#ff8989'
  export default {
    props: {
      percent: {
        type: [Number, String],
        required: true,
        validator: value => value >= 0 && value <= 100
      },
      color: {
        type: String,
        default: DEFAULT_COLOR
      }
    },
    computed: {
      wrapperStyle () {
        return {
          borderColor: this.color
        }
      },
      percentStyle () {
        return {
          background: this.color,
          width: this.percent + '%'
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .progress-wrapper {
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 100px;
    border: 1px solid transparent;
    .percent-filled {
      height: 100%;
    }
  }
</style>