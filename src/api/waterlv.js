import request from "@/utils/request";

export function chartWaterlv(data) {
  return request({
    url: '/waterlv/chartWaterlv',
    method: 'post',
    data: data
  })
}

export function getWaterlv(param) {
  return request({
    url: '/waterlv/getWaterlv',
    method: 'get',
    param: param
  })
}
