import request from "@/utils/request";

export function weatherwarn(data) {
    return request({
        url: '/weather/warn',
        method: 'get',
        data: data
    })
}
