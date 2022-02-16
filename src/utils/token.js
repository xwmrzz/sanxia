import cookie from 'js-cookie'

const storage = 'localStorage'
const tokenKey = 'token'

/**
 * @description 获取token
 */
export function getToken() {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.getItem(tokenKey)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.getItem(tokenKey)
        } else if ('cookie' === storage) {
            return cookie.get(tokenKey)
        } else {
            return localStorage.getItem(tokenKey)
        }
    } else {
        return localStorage.getItem(tokenKey)
    }
}

/**
 * @description 存储token
 * @param token
 */
export function setToken(token) {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.setItem(tokenKey, token)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.setItem(tokenKey, token)
        } else if ('cookie' === storage) {
            return cookie.set(tokenKey, token)
        } else {
            return localStorage.setItem(tokenKey, token)
        }
    } else {
        return localStorage.setItem(tokenKey, token)
    }
}

/**
 * @description 移除token
 */
export function removeToken() {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.removeItem(tokenKey)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.clear()
        } else if ('cookie' === storage) {
            return cookie.remove(tokenKey)
        } else {
            return localStorage.removeItem(tokenKey)
        }
    } else {
        return localStorage.removeItem(tokenKey)
    }
}
