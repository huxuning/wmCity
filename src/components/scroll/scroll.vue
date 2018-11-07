<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    const DIRECTION_H = 'horizontal'
    const DIRECTION_V = 'vertical'

    export default {
      props: {
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: false
        },
        momentum: {
          type: Boolean,
          default: true
        },
        listenScroll: {
          type: Boolean,
          default: false
        },
        data: {
          type: [Array, Object],
          default: null
        },
        pullup: {
          type: Boolean,
          default: false
        },
        beforeScroll: {
          type: Boolean,
          default: false
        },
        refreshDelay: {
          type: Number,
          default: 20
        },
        direction: {
          type: String,
          default: DIRECTION_V
        },
        stopPropagation: {
          type: Boolean,
          default: true
        }
      },
      mounted () {
        setTimeout(() => {
          this._initScroll()
        }, 20)
      },
      methods: {
        _initScroll () {
          if (!this.$refs.wrapper) {
            return
          }
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click,
            momentum: this.momentum,
            stopPropagation: this.stopPropagation,
            eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
          })
          if (this.listenScroll) {
            this.scroll.on('scroll', (pos) => {
              this.$emit('scroll', pos)
            })
            this.scroll.on('scrollEnd', (pos) => {
              this.$emit('scrollToEnd', pos)
            })
          }
          if (this.pullup) {
            this.scroll.on('scrollEnd', () => {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                this.$emit('scrollToEnd')
              }
            })
          }
          if (this.beforeScroll) {
            this.scroll.on('beforeScrollStart', () => {
              this.$emit('beforeScroll')
            })
          }
        },
        disable () {
          console.log('disabled')
          this.scroll && this.scroll.disable()
        },
        enable () {
          this.scroll && this.scroll.enable()
        },
        refresh () {
          this.scroll && this.scroll.refresh()
        },
        scrollTo () {
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement () {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      },
      watch: {
        data () {
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        }
      }
    }
</script>

<style scoped lang="scss">

</style>