import storage from './storage'

const TokenKey = 'token'

export function getToken() {
  return storage.get(TokenKey)
}

export function setToken(token, expire = null) {
  return storage.set(TokenKey, token, expire)
}

export function removeToken() {
  return storage.remove(TokenKey)
}
