import request from "@/utils/request";


export function listWater(data) {
  return request({
    url: '/water/listWater',
    method: 'post',
    data: data
  })
}


export function chartWater(data) {
  return request({
    url: '/water/chartWater',
    method: 'post',
    data: data
  })
}
export function levelWater(data) {
  return request({
    url: '/water/levelWater',
    method: 'post',
    data: data
  })
}
