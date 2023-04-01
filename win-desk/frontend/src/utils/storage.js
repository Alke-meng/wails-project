import config from '@/config'

// 本地存储
class LocalStorage {
  constructor(options) {
    // 配置定义
    this.config = {
      // 命名空间
      namespace: options.namespace || 'localstorage'
    }
  }

  /**
     * Set 设置存储
     *
     * @param {string} name
     * @param {*} value
     * @param {number} expire - seconds,单位秒
     */
  set(name, value, expire) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null
    })
    localStorage.setItem(this.config.namespace + name, stringifyValue)
  }

  /**
     * Get 获取存储
     *
     * @param {string} name
     * @param {*} def - default value
     * @returns {*}
     */
  get(name, def = null) {
    try {
      const item = localStorage.getItem(this.config.namespace + name)
      const data = JSON.parse(item)
      if (data.expire === null) {
        return data.value
      }
      if (data.expire >= new Date().getTime()) {
        return data.value
      }
      this.remove(name)
    } catch (err) {
      return def
    }
    return def
  }

  /**
    * Remove 移除存储
    *
    * @param {string} name
    * @return {boolean}
    */
  remove(name) {
    return localStorage.removeItem(this.config.namespace + name)
  }

  /**
     * 清除当前命名空间下的存储
     * Clear storage
     */
  clear() {
    if (localStorage.length === 0) {
      return
    }

    const removedKeys = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const regexp = new RegExp(`^${this.config.namespace}.+`, 'i')

      if (regexp.test(key) === false) {
        continue
      }

      removedKeys.push(key)
    }

    for (const key in removedKeys) {
      this.remove(removedKeys[key])
    }
  }
}

export default new LocalStorage({
  namespace: config.cacheNamespace
})
