<template>
  <transition name="v-dialog-fade">
    <div class="dialog-wrapper" v-show="value">
      <div class="overlay" v-if="overlay" @click="handleAction('overlayClick')"></div>
      <div class="v-dialog">
        <div class="v-dialog__header" v-if="title" v-text="title" />
        <div class="v-dialog__content">
          <slot>
            <div class="v-dialog__message" v-if="message" :class="{ 'v-dialog__message--withtitle': title }" v-html="message" />
          </slot>
        </div>
        <div class="v-dialog__footer" :class="{ 'is-twobtn': showCancelButton && showConfirmButton }">
          <div  class="btn v-dialog__cancel" v-show="showCancelButton" @click="handleAction('cancel')">
            {{ cancelButtonText }}
          </div>
          <div  class="btn" :class="['v-dialog__confirm']" v-show="showConfirmButton" @click="handleAction('confirm')">
            {{ confirmButtonText }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import VButton from '../v-button/v-button'
  export default {
    name: 'dialog',
    components: {
      VButton
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: false
      },
      confirmButtonText: {
        type: String,
        default: '确认'
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      callback: {
        type: Function
      },
      overlay: {
        default: true
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: false
      },
      lockOnScroll: {
        default: true
      }
    },
    methods: {
      handleAction (action) {
        this.$emit(action)
        this.callback && this.callback(action)
      }
    }
  }
</script>

<style lang="scss">
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  .dialog-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2002;
    flex-direction: column;
    &.v-dialog-fade-enter-active {
      animation: dialog-fadein 0.3s;
      .v-dialog {
        animation: dialog-zoom 0.3s;
      }
    }
  }
  .v-dialog {

    z-index: 1002;
    position: relative;
    width: 72%;
    font-size: 16px;
    overflow: hidden;
    border-radius: 4px;
    background-color: $white;
    background: $white;
    &__header {
      padding: 15px 0 0;
      text-align: center;
    }

    &__content {
      padding: 15px 20px;

      &::after {
        border-bottom-width: 1px;
      }
    }

    &__message {
      line-height: 1.5;

      &--withtitle {
        color: $gray-dark;
        font-size: 14px;
      }
    }

    &__footer {
      display: flex;
      text-align: center;
      @include border-retina($color-border-e, top);
      .btn {
        flex: 1;
        line-height: 22px;
        padding: 10px 0;
        color: $color-text-c;
        &+.btn {
          border-left: 1px solid $color-border-e;
          color: $color-link-active;
        }
      }
      
    }

    .v-button {
      border: 0;
    }

    &__confirm {
      &,
      &:active {
        color: #00C000;
      }
    }

    
  }
  @keyframes dialog-fadein {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

  @keyframes dialog-zoom {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
    .bounce-enter {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.7);
    }

    .bounce-leave-active {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.9);
    }
  .overlay {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    transition: .5s ease-out;
  }
</style>