<template>
  <transition name="toast-fade">
    <div class="toast-wrapper" v-show="visible">
      <div :class="['toast', 'toast-' + displayStyle]">
        <!-- text only -->
        <div v-if="displayStyle === 'text'" class="toast-text">{{ message }}</div>
        <div v-if="displayStyle === 'html'" class="toast-text" v-html="message" />

        <!-- with icon -->
        <template v-if="displayStyle === 'default'">
          <loading v-if="type === 'loading'" color="white" />
          <icon v-else class="toast-icon" :name="type" />
          <div v-if="message" class="toast-text">{{ message }}</div>
        </template>
      </div>
      <div class="toast-overlay" v-if="forbidClick" />
    </div>
  </transition>
</template>

<script>
  import Icon from '../icon/icon'
  import Loading from '../loading/loading'
  const TOAST_TYPES = ['text', 'html', 'loading', 'success', 'fail']
  const DEFAULT_STYLE_LIST = ['success', 'fail', 'loading']
  export default {
    name: 'toast',
    components: {
      Icon,
      Loading
    },
    props: {
      type: {
        type: String,
        default: 'text',
        validator: value => TOAST_TYPES.indexOf(value) > -1
      },
      message: {
        type: String,
        default: ''
      },
      forbidClick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: false
      }
    },
    computed: {
      displayStyle () {
        return DEFAULT_STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;  
  color: #fff;
  z-index: 3001;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(39, 39, 39, .7);

  &-wrapper {
    transition: opacity .2s;
  }

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    background: transparent;
  }

  &-text {
    padding: 12px;
    min-width: 1rem;
    text-align: center;
  }

  &-default {
    min-width: 1rem;
    min-height: .9rem;
    padding: .15rem;

    .toast-icon {
      font-size: 50px;
    }

    .loading {
      margin: 10px 0 5px;
    }

    .toast-text {
      font-size: 16px;
      padding-top: 10px;
    }
  }
}

.toast-fade-enter, .toast-fade-leave-to {
  opacity: 0;
}
</style>