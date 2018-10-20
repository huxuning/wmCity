<template>
  <div class="switch" :class="[`switch-${checked ? 'on' : 'off'}`, { 'switch-disabled': disabled }]" @click="toggleState">
    <div class="switch-node">
      <loading v-if="loading" class="switch-loading" />
    </div>
    <div class="switch-bg"></div>
  </div>
</template>

<script>
  import Loading from '../loading/loading'
  export default {
    name: 'v-switch',
    components: {
      Loading
    },
    props: {
      value: Boolean,
      disabled: Boolean,
      loading: Boolean,
      onChange: Function
    },
    data () {
      return {
        checked: this.value
      }
    },
    watch: {
      checked (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.checked = val
      }
    },
    methods: {
      toggleState: function () {
        if (this.disabled || this.loading) return
        if (this.onChange) {
          this.onChange(!this.checked)
        } else {
          this.checked = !this.checked
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .switch {
    height: 31px;
    width: 51px;
    display: inline-block;
    position: relative;
    background: $color-background-base;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 32px;

    &-node {
      width: 30px;
      height: 30px;
      border-radius: 13.5px;
      background-color: $color-background-base;
      position: absolute;
      box-shadow: 0 3px 1px 0 rgba(0, 0, 0, .05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, .05);
      left: 0;
      top: 0;
      z-index: 2;
      transition: transform .3s;

      &::after {
        border-color: rgba(0, 0, 0, .1);
        border-radius: 27px;
      }
    }

    &-loading {
      width: 16px;
      height: 16px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      margin: 0;
    }

    &-on {
      background-color: $color-theme;

      &::after {
        border-color: #44db5e;
      }

      .switch-node {
        transform: translateX(21px);
      }
    }

    &-off {
      background-color: $color-background-base;
      border-color: rgba(0, 0, 0, .1);
    }

    &-disabled {
      opacity: .4;
    }
  }
</style>