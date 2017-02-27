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

export const computePath = (src, dst, origin) => {
  const sx = src[0] - origin[0]
  const sy = src[1] - origin[1]
  const dx = dst[0] - origin[0]
  const dy = dst[1] - origin[1]
  const path = (sx - dx) * (sx - dx) + (sy - dy) * (sy - dy) > 50 * 50
    ? `M ${sx},${sy} C ${sx + 50},${sy} ${dx - 50},${dy} ${dx},${dy}`
    : `M ${sx},${sy} L ${dx},${dy}`
  return path
}
