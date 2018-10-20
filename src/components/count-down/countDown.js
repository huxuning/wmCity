var Countdown = function (opt) {
  this.totalTime = null
  this.startTime = null
  this.endTime = null
  this.onTick = function () { }
  this.onFinish = function () { }
  this.current = {
    curDay: 0,
    curHour: 0,
    curMinute: 0,
    curSecond: 0
  }
  this.init(opt)
  this.countDowner()
}
Countdown.prototype = {
  init: function (opt) {
    this.isNormal = false
    this.startTime = opt.startTime * 1000 || new Date().getTime()
    if (!opt.endTime) {
      throw new Error('should be enter endTime')
    }
    this.endTime = opt.endTime
    this.totalTime = this.endTime * 1000 - this.startTime
    this.onTick = opt.onTick
    this.onFinish = opt.onFinish
  },
  countDowner: function () {
    var self = this
    if (this.totalTime > 1) {
      this.isNormal = true

      let seconds = this.totalTime / 1000
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      let days = Math.floor(hours / 24)
      this.current.curDay = this.getCurDay(days)
      this.current.curHour = this.getCurHour(hours)
      this.current.curMinute = this.getCurMinute(minutes)
      this.current.curSecond = this.getCurSecond(seconds)

      this.onTick && this.onTick(this.current)

      this.countDownTimer = setTimeout(function () {
        self.totalTime -= 1000
        self.countDowner()
      }, 1000)
    } else {
      this.countDownTimer && clearTimeout(this.countDownTimer)
      if (this.isNormal) {
        this.onFinish && this.onFinish()
      }
    }
  },
  getCurDay: function (days) {
    return days < 10 ? '0' + days : days
  },
  getCurHour: function (hours) {
    return hours % 24 < 10 ? '0' + hours % 24 : hours % 24
  },
  getCurMinute: function (minutes) {
    return minutes % 60 < 10 ? '0' + minutes % 60 : minutes % 60
  },
  getCurSecond: function (seconds) {
    return Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60)
  }
}

export default Countdown
