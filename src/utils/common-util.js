class CommonUtil {
  /**
   * 检测是否隐藏列表底部分页，每页条数大于总条数，则隐藏分页
   * @param {Number} s 每页条数
   * @param {Number} t 记录总条数
   */
  isHidePagination(s, t) {
    if (t > s) {
      return false
    } else {
      return true
    }
  }

  /**
   * 判断字符串是否为空
   * @param {String} str 
   */
  isEmpty(str) {
    return str == null || str === ''
  }

  /**
   * 字符替换
   * @param {String} str 
   * @param {String} origStr 原始串
   * @param {String} tarStr 目标串
   */
  replaceAll(str, origStr, tarStr) {
    return (str == null || str === '')?  '' : str.replace(new RegExp(origStr, "gm"), tarStr);
  }
}

export default new CommonUtil()