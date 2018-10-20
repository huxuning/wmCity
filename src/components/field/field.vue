<template>
  <div class="field-wrapper">
    <input class="field-item" ref="fieldInput" v-bind="$attrs" :type="type" :value="value" @input="onInput" @focus="onFocus"
      @blur="onBlur" />
    <div v-if="hasIcon" v-show="$slots.icon&&isEdit || value&&isEdit" class="field-icon" @touchstart.prevent="onClickIcon">
      <slot name="icon">
        <icon :name="icon" />
      </slot>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon/icon'
  const VALID_TYPES = ['text', 'number', 'email', 'url', 'tel', 'date', 'time', 'datetime', 'password', 'textarea']
  export default {
    name: 'field',
    components: {
      Icon
    },
    data () {
      return {
        isEdit: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'text',
        validator: value => VALID_TYPES.indexOf(value) > -1
      },
      value: String,
      icon: String,
      label: String,
      error: Boolean,
      required: Boolean,
      onIconClick: {
        type: Function,
        default: () => { }
      }
    },
    computed: {
      hasIcon () {
        return this.$slots.icon || this.icon
      }
    },
    methods: {
      onFocus () {
        this.isEdit = true
        this.$emit('focus')
      },
      onBlur () {
        this.isEdit = false
        this.$emit('blur')
      },
      setFocus () {
        this.$refs.fieldInput.focus()
      },
      onInput (event) {
        this.$emit('input', event.target.value)
      },
      onClickIcon () {
        this.$emit('click-icon')
      }
    }
  }
</script>
<style lang="scss">
  .field-wrapper {
    position: relative;
    .field-item {
      border: 0;
      font-size: 14px;
      line-height: 24px;
      height: 24px;
      padding: 0;
      display: block;
      width: 90%;
      outline: none;
      resize: none;
    }
    .field-icon {
      position: absolute;
      right: 0;
      font-size: 20px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      padding: 6px;
      color: #ccc;
    }
  }
</style>