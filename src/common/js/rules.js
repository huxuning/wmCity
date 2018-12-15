import Toast from 'components/toast/'

export const patterns = {
  email: {
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    message: '邮箱格式不正确'
  },
  phone: {
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机格式不正确'
  },
  phoneFF: {
    pattern: /^(\+?33|0)[67]\d{8}$/,
    message: '手机格式不正确'
  },
  code: {
    pattern: /^\d{6}(?!\d)$/,
    message: '邮编格式不正确'
  },
  cityCode: {
    pattern: /^0\d{2,3}$/,
    message: '区号格式不正确'
  },
  tel: {
    pattern: /^\d{7,8}$/,
    message: '电话号码格式不正确'
  },
  number: {
    pattern: /^\d+$/,
    message: '格式不正确,请填写数字'
  },
  captcha: {
    pattern: /[A-Za-z0-9]{4}$/,
    message: '图片验证码格式不正确'
  }
}

function getStringLength (str) {
  if (str === '') {
    return 0
  }
  return str.length * 1
  // return str.replace(/[^\x00-\xff]/, 'xx').length * 1
}

export function validateTelRunCode (value, field = '分机号') {
  if (!value) {
    Toast.fail('请填写' + field)
    return false
  }
  if (!/^\d{1,5}$/.test(value)) {
    Toast.fail(field + '格式有误')
    return false
  }
  return true
}

export function validateTel (value, field = '公司电话') {
  if (!value) {
    Toast.fail('请填写' + field)
    return false
  }
  if (!/^\d{7,8}$/.test(value)) {
    Toast.fail(field + '格式有误')
    return false
  }
  return true
}

export function validateCityCode (value, field = '区号') {
  if (!value) {
    Toast.fail('请填写' + field)
    return false
  }
  if (!/^\d{3,4}$/.test(value)) {
    Toast.fail(field + '格式有误')
    return false
  }
  return true
}

export function validateBankAccount (value, field = '账号') {
  if (!value) {
    Toast.fail('请填写' + field)
    return false
  }
  if (!/^\d{5,22}$/.test(value)) {
    Toast.fail(field + '必须为5-22位数字')
    return false
  }
  return true
}

export function validateUserName (rule, value, callback) {
  if (!/.{6,18}/.test(value)) {
    callback(new Error('限6-18位，字母、数字，至少要包含字母，不区分大小写！'))
    return false
  }
    // 纯数字不能注册
  if (/^\d+$/.test(value)) {
    callback(new Error('用户名不能为纯数字!'))
    return false
  }
  if (!/^[0-9a-zA-Z]{6,18}$/.test(value)) {
    callback(new Error('限6-18位，字母、数字，至少要包含字母，不区分大小写！'))
    return false
  }
  callback()
}

export function validatePhone (value) {
  if (!value) {
    Toast.fail('请填写手机号')
    return false
  }
  if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    Toast.fail('手机格式不正确')
    return false
  }
  return true
}

export function validatePassword (value) {
  if (!value) {
    Toast.fail('请填写密码')
    return false
  }
  if (!/.{6,20}/.test(value)) {
    Toast.fail('限6-20位，包含“字母、数字、符号”，其中的任意两种组合')
    return false
  }
  // 纯数字
  if (/^\d+$/.test(value)) {
    Toast.fail('密码不能为纯数字！')
    return false
  }
  // 纯字母
  if (/^[a-zA-Z]+$/.test(value)) {
    Toast.fail('密码不能为纯字母！')
    return false
  }
  // 纯标点符号
  if (/^[`~!@#$%^&*()\-=_+[\]\\{}|;':",./<>?]+$/.test(value)) {
    Toast.fail('密码不能为纯标点符号！')
    return false
  }
  if (!/^[0-9a-zA-Z`~!@#$%^&*()\-=_+[\]\\{}|;':",./<>?]{6,20}$/.test(value)) {
    Toast.fail('限6-20位，包含“字母、数字、符号”，其中的任意两种组合')
    return false
  }
  return true
}

export function validateNotNull (value, field = '验证码') {
  if (!value) {
    Toast.fail('请填写' + field)
    return false
  }
  return true
}

export function validateCompanyName (value) {
  if (value === '') {
    Toast.fail('请填写公司名称！')
    return false
  }
  if (/\s/g.test(value)) {
    Toast.fail('公司名4-50个字符，不能包含空格！')
    return false
  }
  if (!/^.{4,50}$/.test(value)) {
    Toast.fail('公司名称长度必须为4-50个字符')
    return false
  }
  return true
}

export function validateContact (value) {
  if (value === '') {
    Toast.fail('请填写姓名！')
    return false
  }
  if (!/^([\u4E00-\u9FA5|a-zA-Z|\s|'])+$/.test(value)) {
    Toast.fail('姓名只能填写中文或英文！')
    return false
  }
  if (!/^.{2,20}$/.test(value)) {
    Toast.fail('姓名长度必须为2-20个字符')
    return false
  }
  return true
}

export function validateEmail (value) {
  if (value === '') {
    Toast.fail('请填写邮箱地址！')
    return false
  }
  if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    Toast.fail('邮箱格式不正确')
    return false
  }
  return true
}

export function validateAddress (value) {
  if (value === '') {
    Toast.fail('请填写详细地址！')
    return false
  }
  let len = getStringLength(value)
  if (len > 100) {
    Toast.fail('详细地址最多填写100字符')
    return false
  }
  return true
}

export function validateUpload (file, limitTypes) {
  let type = file.type
  let limit = limitTypes || ['image/gif', 'image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
  let isLt2M = file.size / 1024 / 1024 < 2

  if (limit.indexOf(type) === -1) {
    Toast.fail('仅支持：jpg、jpeg、png、pdf')
    return false
  }
  if (!isLt2M) {
    Toast.fail('文件大小不能超过2M')
    return false
  }
  return true
}
