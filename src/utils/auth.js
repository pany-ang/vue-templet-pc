import Cookies from 'js-cookie'

const TokenKey = 'TokenKey'

export function getToken() {
  return Cookies.get(TokenKey)
  // return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  const currentCookieSetting = {
    // expires: 0.02
  }
  return Cookies.set(TokenKey, token, currentCookieSetting)
  // return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
  // return localStorage.removeItem(TokenKey)
}
