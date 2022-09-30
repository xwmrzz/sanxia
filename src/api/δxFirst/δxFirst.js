import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/δxFirst/getδxFirstList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/δxFirst/addδxFirst',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/δxFirst/deleteδxFirst/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/δxFirst/updateδxFirst',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/δxFirst/getδxFirstPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/δxFirst/getPointSelector',
    method: 'post',
    data: data
  })
}