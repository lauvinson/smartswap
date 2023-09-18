export const getFirstLevelDomain = (domain: string) => {
  const splitArr = domain.split('.')
  const arrLen = splitArr.length

  // 如果域名数组长度大于等于2，则取最后两位作为一级域名，比如google.com
  if (arrLen >= 2) {
    return splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
  } else {
    return domain
  }
}
