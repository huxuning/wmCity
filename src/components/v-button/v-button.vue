<template>
  <button class="v-btn" :class="classes" :disabled="disabled" :type="actionType" @click="onClick">
    <i class="btn-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  export default {
    name: 'x-button',
    props: {
      type: {
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      mini: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      actionType: {
        type: String,
        default: 'button'
      },
      showLoading: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClick () {
      }
    },
    computed: {
      classes () {
        return [
          {
            'v-btn_disabled': this.disabled,
            'v-btn_mini': this.mini
          },
          `v-btn_${this.type}`,
          this.plain ? `v-btn_plain-${this.type}` : '',
          this.showLoading ? `v-btn_loading` : ''
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "~common/style/variable.scss";
  .v-btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: .12rem;
    padding-right: .12rem;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.2;
    border-radius: 3px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
    width: 100%;

    background-color: $color-background;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
  }

  .v-btn_default {
    color: $color-text-3;
    background-color: $color-background-base;
  }

  .v-btn_mini {
    display: inline-block;
    padding: 0 1.32em;
    line-height: 1.8;
    font-size: 13px;
    width: auto;
    border-radius: 30px;
  }

  .v-btn_primary {
    background-color: $color-theme;
  }

  .v-btn_btn {
    background-color: $color-btn;
  }

  .v-btn_plain-default {
    color: $color-text-3;
    border: 1px solid $color-text-c;
    border-width: 1px;
    background-color: transparent;
  }

  .v-btn_plain-primary {
    color: $color-theme;
    border: 1px solid $color-theme;
    border-width: 1px;
    background-color: transparent;
  }

  .v-btn_plain-btn {
    color: $color-btn;
    border: 1px solid $color-btn;
    border-width: 1px;
    background-color: transparent;
  }

  .v-btn_del-btn {
    color: $color-text-3;
    background-color: $color-background;
    border: 1px solid $white;
  }
  .v-btn_disabled {
    opacity: .75
  }

  .btn-loading {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    animation: btnLoading 1s steps(12, end) infinite;
    background: transparent url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat;
    background-size: 100%;
  }

  @keyframes btnLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
</style>
