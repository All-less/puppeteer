const checkUsernameReg = /^[A-Za-z0-9_]{6,20}$/
export const validateUsername = (username) => {
  const errors = []
  if (!username) {
    errors.push('用户名不能为空')
  } else if (!checkUsernameReg.test(username)) {
    errors.push('用户名仅能为数字、字母或下划线，至少 6 位')
  }
  return errors
}

const checkPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const validatePassword = (password) => {
  const errors = []
  if (!password) {
    errors.push('密码不能为空')
  } else if (!checkPasswordReg.test(password)) {
    errors.push('密码必须同时包含字母和数字，至少 8 位')
  }
  return errors
}
