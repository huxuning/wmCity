<template>
  <div class="count-down">
    <span class="item"><span :class="[dayClass]">{{timerObj.curDay}}</span>天</span>
    <span class="item"><span :class="[hourClass]">{{timerObj.curHour}}</span>时</span>
    <span class="item"><span :class="[minuteClass]">{{timerObj.curMinute}}</span>分</span>
    <span class="item"><span :class="[secondClass]">{{timerObj.curSecond}}</span>秒</span>
  </div>
</template>

<script>
  import Countdown from './countDown'
  export default {
    name: 'count-down',
    props: {
      dayClass: String,
      hourClass: String,
      minuteClass: String,
      secondClass: String,
      endTime: {
        type: [String, Number],
        default: 0
      },
      startTime: {
        type: [String, Number],
        default: 0
      },
      onTick: {
        type: Function,
        default: () => {
        }
      },
      onFinish: {
        type: Function,
        default: () => {
        }
      }
    },
    data () {
      return {
        timerObj: {
          curDay: '00',
          curHour: '00',
          curMinute: '00',
          curSecond: '00',
          countDown: null
        },
        currentDate: ''
      }
    },
    created () {
      if (this.endTime !== 0 || this.startTime !== 0) {
        this._createCountDown()
      }
    },
    methods: {
      _createCountDown () {
        this.countDown = new Countdown({
          endTime: this.endTime,
          startTime: this.startTime,
          onFinish: this.onFinish,
          onTick: (obj) => {
            this.timerObj = obj
          }
        })
      }
    },
    watch: {
      startTime (value) {
        if (!this.countDown) {
          console.log(2)
          this._createCountDown()
        }
      },
      endTime (value) {
        if (!this.countDown) {
          this._createCountDown()
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .count-down {
    overflow: hidden;
    .item {
      float: left;
    }
  }
</style>