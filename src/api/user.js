import request from "@/utils/request";

export function login(data) {
    return request({
        url: '/api/loginuser',
        method: 'post',
        data: data
    })
}

export function getUserInfo(data) {
    return request({
        url: '/api/getUserInfo',
        method: 'get',
        params: data
    })
}

// export function getWaterlv(data) {
//   return request({
//     url: '/api/getWaterlv',
//     method: 'get',
//     params: data
//   })
// }
