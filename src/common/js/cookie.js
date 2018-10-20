const cookie = {
  set (name, value) {
    let Days = 30
    let exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  get (name) {
    let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let reg = arr
    arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  del (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = this.get(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
    }
  }
}
export default cookie
