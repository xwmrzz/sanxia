import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/δyFirst/getδyFirstList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/δyFirst/addδyFirst',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/δyFirst/deleteδyFirst/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/δyFirst/updateδyFirst',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/δyFirst/getδyFirstPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/δyFirst/getPointSelector',
    method: 'post',
    data: data
  })
}