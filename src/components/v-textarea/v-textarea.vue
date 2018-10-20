<template>
    <div class="v-textarea">
      <textarea class="textarea" :placeholder="placeholder" :disabled="disabled" v-model="textareaValue"></textarea>
      <div class="count" v-if="max">
          <span>{{count}}</span>/{{max}}
      </div>
    </div>
  </template>

  <script>
    export default {
      name: 'v-textarea',
      props: {
        max: Number,
        placeholder: '',
        value: String,
        disabled: {
          type: Boolean,
          default: false
        }
      },
      data () {
        return {
          textareaValue: this.value
        }
      },
      computed: {
        count () {
          let len = 0
          if (this.textareaValue) {
            // len = this.textareaValue.replace(/[^\x00-\xff]/g, 'xx').length * 1
            len = this.textareaValue.length * 1
            // len = this.textareaValue.replace(/\n/g, 'aa').length
          }
          return len > this.max ? this.max : len
        }
      },
      watch: {
        textareaValue (newValue) {
          // let len = newValue.replace(/[^\x00-\xff]/g, 'xx').length * 1
          let len = newValue.length * 1
          let count = 0
          let cutIndex = 0
          let i = 0
          if (this.max && newValue && len > this.max) {
            for (; i < this.max; i++) {
              // if (/[^\x00-\xff]/.test(newValue[i])) {
              //   count += 2
              // } else {
              //   count += 1
              // }
              count += 1
              if (count >= this.max) {
                cutIndex = i
                break
              }
            }
            this.textareaValue = this.textareaValue.substr(0, cutIndex + 1)
            console.log(cutIndex)
          }

          this.$emit('input', this.textareaValue)
          this.$emit('on-change', this.textareaValue)
        },
        value (newValue) {
          this.textareaValue = newValue
        }
      }
    }
  </script>

  <style lang="scss" scoped rel="stylesheet/scss">
    @import '~common/style/variable.scss';
    .v-textarea {
      font-size: $font-size-mid-l;
      position: relative;
      overflow: hidden;
      padding-bottom: .3rem;
      background: $white;
      .count {
        text-align: right;
        color: $color-text-9;
        position: absolute;
        right: 10px;
        bottom: .1rem;
      }
      .textarea {
        margin: 0;
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: .6rem;
        border: none;
        outline: none;
        padding: 10px 15px;
        line-height: 24px;
        resize: none;
        font-size: $font-size-mid-l;
        &[disabled]{
          background: $white;
        }
      }
    }
  </style>
