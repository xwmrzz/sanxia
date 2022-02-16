import axios from 'axios'
import { isArray } from '@/utils/validate'
import router from '@/router'
import store from '@/store'
import { getToken } from "@/utils/token"
import qs from "qs";

const baseURL = 'http://192.168.3.179:8088'
const requestTimeout = 60000
const contentType =  'application/x-www-form-urlencoded;charset=UTF-8'// application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
const statusName = 'status'
const successCode = [200, '200', 0, '0']
const messageName = 'msg'

// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
    ? [...successCode]
    : [...[successCode]]

const CODE_MESSAGE = {
    200: '请求成功',
    201: '新建或修改数据成功',
    202: '一个请求已经进入后台排队(异步任务)',
    204: '删除数据成功',
    400: '发出信息有误',
    401: '用户没有权限(令牌、用户名、密码错误)',
    403: '用户得到授权，但是访问是被禁止的',
    404: '访问资源不存在',
    406: '请求格式不可得',
    410: '请求资源被永久删除，且不会被看到',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '请求超时',
}

const handleData = ({ config, data, status, statusText }) => {
    // Vue.prototype.$hideLoading()
    // 属于个别情况，作为特殊处理
    if (data[statusName] === 0) data[statusName] = '0'
    // 若data.code存在，覆盖默认code
    let code = data && data[statusName] ? data[statusName] : status
    // 若code属于操作正常code，则status修改为200
    if (codeVerificationArray.includes(code)) code = 200
    switch (code) {
        case 200:
            // 请求成功响应拦截，返回拿到的数据
            return data
        case 401:
            store.dispatch('user/resetAll').then((r) => {})
            router.push({ path: '/login', replace: true }).then((r) => {})
            break
        case 403:
            router.push({ path: '/403' }).then((r) => {})
            break
    }
    // 异常处理
    // 若data.msg存在，覆盖默认提醒消息
    const message = `${config.url} 后端接口 ${code} 异常：${
        !data
            ? CODE_MESSAGE[code]
            : !data[messageName]
            ? statusText
            : data[messageName]
    }`
    // Vue.prototype.$greatMessage(
    //     `${message}`,
    //     'error',
    //     false,
    //     'great-message-error'
    // )
    return Promise.reject(message)
}

/**
 * @description 初始化axios
 */
const instance = axios.create({
    baseURL,
    timeout: requestTimeout,
    headers: {
        'Content-Type': contentType,
    },
})

/**
 * @description 请求拦截
 */
instance.interceptors.request.use(
    (config) => {
        // Vue.prototype.$showLoading()
        const token = getToken()

        if (token) config.headers['token'] = token
        if (
            config.data &&
            config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
        ) config.data = qs.stringify(config.data)

        return config
    },
    (error) => {
        // Vue.prototype.$greatMessage(
        //     `${error}`,
        //     'error',
        //     false,
        //     'great-message-error'
        // )
        return Promise.reject(error)
    }
)

/**
 * @description 响应拦截
 */
instance.interceptors.response.use(
    (response) => handleData(response),
    (error) => {
        // Vue.prototype.$hideLoading()
        const { response } = error
        if (response === undefined) {
            return {}
        } else return handleData(response)
    }
)

export default instance
