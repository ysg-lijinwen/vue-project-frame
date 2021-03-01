
const SSOTokenKey='sso.base.carlea.com'

export function getToken() {
  return sessionStorage.getItem(SSOTokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(SSOTokenKey, token)
}

export function removeToken() {
  if(getToken()){
    sessionStorage.removeItem(SSOTokenKey)
  }
}
