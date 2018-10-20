<template>
  <div>
    <div class="group-title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <slot name="title"></slot>
    <div class="cells" :class="{'no-group-title':!title}" :style="{marginTop: gutter + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    titleColor: String,
    labelWidth: {
      type: String,
      default: '30%'
    },
    labelAlign: String,
    gutter: Number
  }
}
</script>
<style lang="scss">
  @import '~common/style/variable.scss';
  .group-title {
    padding-left: 10px;
    margin-top: 0.77em;
    margin-bottom: 0.3em;
    color: $color-text-9;
    font-size: $font-size-mid;
  }
  .no-group-title {
    /* margin-top: 14px; */
  }
</style>