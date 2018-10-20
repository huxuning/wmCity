<template>
  <div class="cell-wrapper" @click="handlClick">
    <div class="cell-hd">
      <span v-if="required" class="required">*</span>
      <slot name="icon"></slot>
      <label class="cell-lable" :style="getLabelStyles()" :class="labelClass" v-if="title || hasTitleSlot">
          {{title}}
        </label>
    </div>
    <div class="cell-bd">
      <slot name="content"></slot>
    </div>
    <div v-if="value || $slots.value || isLoading" class="cell-ft" :class="valueClass" :style="getFtStyles()">
      <slot name="value" ></slot>
      <slot>{{ value }}</slot>
      <i class="loading" v-if="isLoading"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    isLink: Boolean,
    title: String,
    value: String,
    linkPath: String,
    required: Boolean,
    isLoading: Boolean,
    valueAlign: String,
    disabled: Boolean,
    valueColor: {
      type: String,
      default: '#666'
    }
  },
  beforeMount () {
    this.hasTitleSlot = !!this.$slots.title
  },
  computed: {
    valueClass () {
      return {
        'cell-access': this.isLink,
        'cell-align-left': this.valueAlign === 'left'
      }
    },
    labelClass () {
      return {
        'cell-justify': this.$parent.labelAlign === 'justify'
      }
    }
  },
  methods: {
    handlClick () {
      if (this.isLink && this.linkPath) {
        this.$router.push({
          path: this.linkPath
        })
      }
      this.$emit('cell-click')
    },
    getLabelStyles () {
      return {
        width: this.$parent.labelWidth,
        marginRight: this.$parent.labelMarginRight
      }
    },
    getFtStyles () {
      return {
        color: this.valueColor
      }
    }
  },
  data () {
    return {
      hasTitleSlot: false
    }
  }
}
</script>

<style lang="scss">
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  $cell-height: 24px;
  .cell-wrapper {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    line-height: 1.41176471;
    padding: 10px;
    position: relative;
    display: flex;
    font-size: $font-size-mid-l;
    background: #fff;
    & + .cell-wrapper {
      @include border-retina($color-border-e, top);
    }
  }
  .cell-access {
    &:after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: matrix(.71,.71,-.71,.71,0,0);
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: .1rem;
    }
  }

  .cell-lable {
    flex: 1;
    word-wrap: break-word;
    word-break: break-all;
  }
  .cell-hd {
    height:  $cell-height;
    line-height:  $cell-height;
    display: flex;
    .required {
      color: #f44;
    }
  }
  .cell-bd {
    padding-left: 10px;
    line-height:  $cell-height;
    display: flex;
    padding-right: 4px;
    flex: 1;
    color: $color-text-6;
  }
  .cell-ft {
    height:  $cell-height;
    line-height:  $cell-height;
    position: relative;
    padding-right: 17px;
    text-align: right;
    color: $color-text-6;
    /* @include ellipsis; */
  }
  .cell-justify {
    height: 1.41em;
    text-align: justify;
    &:after {
      content: "";
      display: inline-block;
      width: 100%;
      overflow: hidden;
      height: 0;
      line-height: 0;
    }
  }

</style>
