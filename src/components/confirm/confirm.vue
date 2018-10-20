<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="overlay"></div>
      <div class="confirm-content">
        <div class="confirm-hd" v-show="title">
          <h3 class="title">{{title}}</h3>
        </div>
        <div class="confirm-bd">
          <slot name="content"></slot>
        </div>
        <div class="confirm-ft">
          <div @click="cancel" class="operate-btn">{{cancelBtnText}}</div>
          <div @click="confirm" v-if="!$slots.confirmBtn" class="operate-btn">{{confirmBtnText}}</div>
          <div @click="confirm" v-if="$slots.confirmBtn" class="operate-btn">
            <slot name="confirmBtn"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      cancel () {
        this.hide()
        this.$emit('cancel')
      },
      confirm () {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/style/variable.scss";
  @import '~common/style/mixin.scss';

  .overlay {
    @include overlay;
  }

  .confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2003;
    flex-direction: column;
    &.confirm-fade-enter-active {
      animation: confirm-fadein 0.3s;
      .confirm-content {
        animation: confirm-zoom 0.3s;
      }
    }
    .confirm-content {
      position: relative;
      z-index: 1001;
      border-radius: 5px;
      overflow: hidden;
      width: 75%;
      background: $color-background-base;
      text-align: center;
      .confirm-hd {
        padding: 20px 10px 0 20px;
        font-size: $font-size-large;
        color: $color-text-3;
      }
      .confirm-bd {
        padding: 20px 10px;
      }
      .confirm-ft {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;
        @include border-retina($color-border-e, top);
      }
      .operate-btn {
        flex: 1;
        line-height: 22px;
        padding: 10px 0;
        color: $color-text-c;
        &+.operate-btn {
          border-left: 1px solid $color-border-e;
          color: $color-link-active;
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-zoom {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
