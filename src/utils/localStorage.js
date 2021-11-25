class LocalCache {
  // localStorage缓存数据
  setCache(key, value) {
    // obj => string
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // string => obj
      return JSON.parse(value)
    }
  }
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
