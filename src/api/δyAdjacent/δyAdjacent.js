import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/δyAdjacent/getδyAdjacentList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/δyAdjacent/addδyAdjacent',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/δyAdjacent/deleteδyAdjacent/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/δyAdjacent/updateδyAdjacent',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/δyAdjacent/getδyAdjacentPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/δyAdjacent/getPointSelector',
    method: 'post',
    data: data
  })
}