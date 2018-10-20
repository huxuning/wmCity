<template>
  <div class="panel">
    <div class="panel-hd border-retina">
      <slot name="header">
        <div class="panel-title" v-text="title">
        </div>
        <span class="panel-status">
            <slot name="status"></slot>
        </span>
      </slot>
    </div>
    <div class="panel-bd">
      <slot></slot>
    </div>
    <div class="panel-ft" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panel',
    props: {
      desc: String,
      title: String
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  .panel {
    background: $color-background-base;
    &-hd {
      height: .8rem;
      position: relative;
      padding: 10px 15px;
      box-sizing: border-box;
      @include border-retina($color-border-e);
    }

    &-title {
      position: relative;
      height: 24px;
      line-height: 24px;
      font-size: $font-size-mid-l;
      color: $color-text-3;
      &::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 50%;
        width: 3px;
        border-radius: 4px;
        height: 70%;
        background: $color-theme;
        transform: translate3d(0, -50%, 0)
      }
    }

    &-status {
      font-size: 14px;
      position: absolute;
      padding: 6px;
      top: 9px;
      right: 9px;
      /* color: $color-danger; */
      color: $color-text-9;
    }

    &-ft {
      padding: 10px 15px;
    }
  }
</style>