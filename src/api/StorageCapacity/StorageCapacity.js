import request from "@/utils/request";


export function listCapacity(data) {
  return request({
    url: '/capacity/listCapacity',
    method: 'post',
    data: data
  })
}


export function chartCapacity(data) {
  return request({
    url: '/capacity/chartCapacity',
    method: 'post',
    data: data
  })
}
