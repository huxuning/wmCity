<template>
  <div class="popup-side" @click="clickMask" ref="popupSide" :class="['popup-side-' + position, showFlag ? 'popup-toggle' : '' ]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      lockOnScroll: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: 'right'
      },
      closeOnClickMask: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      clickMask () {
        if (this.closeOnClickMask) {
          this.hide()
        }
      },
      show () {
        this.showFlag = true
        if (this.lockOnScroll) {
          this.$refs.popupSide.addEventListener('touchmove', function (event) { event.preventDefault() }, false)
        }
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .popup-side {
    position: fixed;
    z-index: 2002;
    background-color: rgba(0, 0, 0, .75);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;
    overflow: auto;

    &.popup-side-right {
      transform: translate3d(100%, 0, 0);
    }
    &.popup-side-left {
      transform: translate3d(-100%, 0, 0);
    }
    &.popup-side-bottom {
      transform: translate3d(0, 100%, 0);
    }
    &.popup-side-top {
      transform: translate3d(0, -100%, 0);
    }
    &.popup-toggle {
      transform: translate3d(0, 0, 0);
    }
  }
</style>