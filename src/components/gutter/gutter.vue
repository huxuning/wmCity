<template>
  <div :class="[, size==='large' ? 'gutter-large' : 'gutter' ]"></div>
</template>

<script>
  export default {
    name: 'gutter',
    props: {
      size: {
        type: String,
        default: 'small'
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .gutter {
    height: $gutter;
    background-color: $color-background;
  }
  .gutter-large {
    height: $gutter-l;
  }
</style>