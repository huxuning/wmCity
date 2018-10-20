<template>
  <div class="v-uploader">
    <slot></slot>
    <input type="file" @change="onValueChange" :disabled="disabled" class="v-uploader__input" ref="input" />
  </div>
</template>

<script>
export default {
  name: 'uploader',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: '/Member/avatar'
    },
    beforeSend: Function,
    onFinish: Function,
    onError: Function,
    resultType: {
      type: String,
      default: 'text',
      validator: value => value === 'dataUrl' || value === 'text'
    }
  },
  methods: {
    onValueChange (event) {
      if (this.disabled) {
        return
      }
      const file = event.target.files[0]
      if (!file || (this.beforeSend && !this.beforeSend(file))) {
        return
      }
      const reader = new FileReader()

      if (this.resultType === 'dataUrl') {
        reader.readAsDataURL(file)
      } else if (this.resultType === 'text') {
        reader.readAsText(file)
      }

      reader.onload = (e) => {
        let context = e.target.result
        let formData = new FormData()
        formData.append('file', file)
        this.$refs.input && (this.$refs.input.value = '')
        this._send(formData, context)
      }
    },
    _send (formData, context) {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', this.url, true)
      xhr.onreadystatechange = (response) => {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText !== '') {
          let data = JSON.parse(xhr.responseText)
          this.onFinish && this.onFinish(data, context)
        } else if (xhr.status !== 200 && xhr.responseText) {
          this.onError && this.onError()
        }
      }
      xhr.send(formData)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .v-uploader {
    position: relative;
    display: inline-block;

    &__input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    input[type='file']::-webkit-file-upload-button {
      cursor: pointer;
    }
  }
</style>