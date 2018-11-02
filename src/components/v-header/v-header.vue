<template>
  <div class="v-header border-retina">
    <div class="left" v-if="showLeft" @click="clickBack">
      <slot name="left">
        <i v-if="goback" class="icon-arrow-left"></i>
      </slot>
    </div>
    <div class="center">
      <slot name="center">
        {{title}}
      </slot>
    </div>
    <div class="right" :class="{hasTitle: rightTitle}" v-if="showRight">
        <slot name="right"></slot>
        <span class="right-title" v-if="rightTitle">{{rightTitle}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showLeft: {
        type: Boolean,
        default: true
      },
      showRight: {
        type: Boolean,
        default: true
      },
      goback: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      rightTitle: {
        type: String,
        default: ''
      }
    },
    methods: {
      clickBack () {
        this.$emit('clickBack')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  .v-header {
    @include border-retina($color-border-e);
    padding: .14rem .24rem;
    height: .86rem;
    display: flex;
    font-size: 16px;
    text-align: center;
    background-color: $color-primary;
    box-sizing: border-box;
    z-index: 10;
    .left {
      height: .58rem;
      flex: 0 0 .4rem;
      color: #fff;
      cursor: pointer;
      [class^="icon-"], [class*=" icon-"] {
        position: relative;
        top: 3px;
        left: -3px;
        font-size: $font-size-large-lx;
      }
    }
    .center {
      height: .58rem;
      line-height: .58rem;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
      font-size: $font-size-large-ls;
      text-align: center;
    }
    .right {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      height: .58rem;
      flex: 0 0 .4rem;
      color: $color-text-9;
      display: flex;
      flex-direction: column;
      align-items: center;
      [class^="icon-"], [class*=" icon-"] {
        font-size: $font-size-max;
        color: $color-theme;
      }
      &.hasTitle {
        [class^="icon-"], [class*=" icon-"] {
          font-size: $font-size-large-l;
        }
      }
    }
    .right-title {
      /* position: relative;
      top: -.1rem; */
      font-size: $font-size-small-x;
      color: $color-theme;
    }
  }
</style>