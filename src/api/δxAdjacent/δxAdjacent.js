import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/δxAdjacent/getδxAdjacentList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/δxAdjacent/addδxAdjacent',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/δxAdjacent/deleteδxAdjacent/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/δxAdjacent/updateδxAdjacent',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/δxAdjacent/getδxAdjacentPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/δxAdjacent/getPointSelector',
    method: 'post',
    data: data
  })
}