<template>
  <div class="actionsheet-wrapper" >
    <transition name="actionsheet-overlay">
      <div class="overlay" @click="clickOverlay" v-show="showFlag"></div>
    </transition>
    <div class="actionsheet-content" :class="{'actionsheet_toggle': showFlag}">
      <div class="actionsheet-cell-wrapper">
        <div class="actionsheet-cell" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </div>
        <div class="actionsheet-cell" v-for="(item, index) in menus" @click="onMenuClick(item, index)" v-html="item.label || item" :class="`actionsheet-menu-${item.type || 'default'}`">
        </div>
      </div>
      <div class="cancel-wrapper" v-if="showCancel">
        <div class="actionsheet-cell" @click="cancel">{{cancelText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showCancel: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: '关闭'
      },
      closeOnClickMask: {
        type: Boolean,
        default: true
      },
      menus: {
        type: Array,
        default: () => ([])
      }
    },
    mounted () {
      this.hasHeaderSlot = !!this.$slots.header
    },
    data () {
      return {
        hasHeaderSlot: false,
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      clickOverlay () {
        if (this.closeOnClickMask) {
          this.hide()
        }
      },
      hide () {
        this.showFlag = false
      },
      cancel () {
        this.hide()
        this.$emit('on-cancel-click')
      },
      onMenuClick (item, index) {
        if (item.type === 'disabled') return
        this.$emit('on-action-click', item, index)
        this.hide()
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/style/variable.scss";
  @import '~common/style/mixin.scss';
  .actionsheet-wrapper {
    position: relative;
    z-index: 2002;
  }
  .actionsheet-content {
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translate(0, 100%);
    backface-visibility: hidden;
    width: 100%;
    transition: transform .3s;
    z-index: 1002;
    color: $color-text-3;
    font-size: $font-size-large;
    background-color: #ddd;
  }

  .actionsheet-cell {
    position: relative;
    padding:.2rem 0;
    text-align: center;
    font-size: $font-size-large;
    background-color: $color-background-base;
    & + .actionsheet-cell {
      @include border-retina($color-border-e, top);
    }
  }
  .cancel-wrapper {
    margin-top: $gutter;
    background-color: $color-background-base;
  }

  .actionsheet_toggle {
    transform: translate(0, 0);
  }

  .actionsheet-menu-disabled {
    color: $color-text-9;
  }

  .overlay {
    @include overlay;
  }

  .actionsheet-overlay-enter,
  .actionsheet-overlay-leave-active {
    opacity: 0;
  }

  .actionsheet-overlay-leave-active,
  .actionsheet-overlay-enter-active{
    transition: opacity 300ms!important;
  }
</style>
