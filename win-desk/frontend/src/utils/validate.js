/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {obj} obj
 * @param {string} key
 * @returns {Boolean}
 */
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 是否对象
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否空数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isEmptyArray(array) {
  return Array.isArray(array) && array.length === 0;
}
