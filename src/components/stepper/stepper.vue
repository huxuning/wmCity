<template>
  <div class="stepper" :class="{ 'stepper-disabled': disabled }">
    <button @click="handleChange('minus')" class="stepper-stepper stepper-minus" :class="{
          'stepper-minus-disabled': isMinusDisabled
        }">
      </button>
    <input type="text" class="stepper-input" :value="currentValue" @input="handleInputChange" @blur="handleInputBlur" :disabled="disabled || disableInput">
    <button @click="handleChange('plus')" class="stepper-stepper stepper-plus" :class="{
          'stepper-plus-disabled': isPlusDisabled
        }">
      </button>
  </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: {
      min: {
        type: [String, Number],
        default: 1
      },
      max: {
        type: [String, Number],
        default: Infinity
      },
      value: [String, Number],
      step: {
        type: [String, Number],
        default: 1
      },
      disabled: Boolean,
      disableInput: Boolean,
      defaultValue: {
        type: [String, Number],
        default: 1
      }
    },
    data () {
      let value = this.value ? +this.value : +this.defaultValue
      const correctedValue = this.correctValue(value)
      if (value !== correctedValue) {
        value = correctedValue
        this.$emit('input', value)
      }
      return {
        currentValue: value
      }
    },
    computed: {
      isMinusDisabled () {
        const min = +this.min
        const step = +this.step
        const currentValue = +this.currentValue
        return min === currentValue || (currentValue - step) < min || this.disabled
      },
      isPlusDisabled () {
        const max = +this.max
        const step = +this.step
        const currentValue = +this.currentValue
        return max === currentValue || (currentValue + step) > max || this.disabled
      }
    },
    created () {
    },
    watch: {
      value (val) {
        const correctedValue = this.correctValue(val)
        if (val !== correctedValue) {
          val = correctedValue
          this.$emit('input', val)
        }
        this.currentValue = val
      },
      min (val) {
        this.currentValue = val
      },
      currentValue (val) {
        let args = {...{}, ...this.$attrs}
        this.$emit('input', val, args)
        this.$emit('change', val, args)
      }
    },
    methods: {
      // 纠正value值
      correctValue (value) {
        if (Number.isNaN(value)) {
          value = this.value || this.min
        } else {
          value = Math.max(this.min, value)
          value = Math.min(this.max, value)
        }
        return value
      },
      handleInputChange (event) {
        const val = +event.target.value
        if (val === 0) {
          return
        }
        // this.currentValue = ''
        // this.currentValue = this.correctValue(val)
      },
      handleInputBlur (event) {
        const val = +event.target.value
        this.currentValue = ''
        this.currentValue = this.correctValue(val)
      },
      handleChange (type) {
        if ((this.isMinusDisabled && type === 'minus') || (this.isPlusDisabled && type === 'plus')) {
          this.$emit('overlimit', type)
          return
        }
        const step = +this.step
        const currentValue = +this.currentValue
        this.currentValue = type === 'minus' ? (currentValue - step) : (currentValue + step)
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
$text-color: #333;
$border-color: #ccc;
$active-color: #e8e8e8;
$background-color: #f8f8f8;

$white: #fff;
$gray: #c9c9c9;
$gray-light: #e5e5e5;
$gray-darker: #666;
$gray-dark: #999;

.stepper {
  font-size: 0;

  &-disabled {
    .stepper-input,
    .stepper-minus,
    .stepper-plus {
      border-color: $active-color;
    }
  }

  &-stepper {
    width: 40px;
    height: 30px;
    box-sizing: border-box;
    background-color: $white;
    border: 1px solid $border-color;
    position: relative;
    padding: 5px;
    vertical-align: middle;

    &::before {
      width: 9px;
      height: 1px;
    }

    &::after {
      width: 1px;
      height: 9px;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #6c6c6c;
    }
  }

  &-minus {
    border-radius: 2px 0 0 2px;

    &::after {
      display: none;
    }

    &-disabled {
      background-color: $background-color;
      border-color: $active-color $border-color $active-color $active-color;
    }
  }

  &-plus {
    border-radius: 0 2px 2px 0;

    &-disabled {
      background-color: $background-color;
      border-color: $active-color $active-color $active-color $border-color;
    }
  }

  &-input {
    width: 33px;
    height: 26px;
    padding: 1px;
    border: 1px solid $border-color;
    border-width: 1px 0;
    border-radius: 0;
    box-sizing: content-box;
    color: $text-color;
    font-size: 16px;
    vertical-align: middle;
    text-align: center;
    -webkit-appearance: none;
  }
}
</style>