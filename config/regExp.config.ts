export const patters = {
  username: /^[\d\w-_]{4,32}$/,
  password: /^[\d\w-_]{4,32}$/,
  nickname: /^[\d\w\u4e00-\u9fa5-_]{2,15}$/,
  phone: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
  ip: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]).){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
};

export const msgs = {
  username: '请输入正确的用户名，4-32位、字母、数字、下划线、减号',
  password: '请输入正确的密码，4-32位、字母、数字、下划线、减号',
  nickname: '请输入正确的昵称，2-32位、中文、字母、数字，下划线、减号',
  phone: '请输入正确格式的手机号',
  ip: '请输入正确的IP地址',
};

// 合并正则与提示
export const matchesArgs = Object.keys(patters).reduce((matchesArgs, key) => {
  matchesArgs[key] = [patters[key], msgs[key]];
  return matchesArgs;
}, {} as Record<keyof typeof patters, [RegExp, string]>);
