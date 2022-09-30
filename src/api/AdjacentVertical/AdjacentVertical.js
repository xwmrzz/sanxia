import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/AdjacentVertical/getAdjacentVerticalList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/AdjacentVertical/addAdjacentVertical',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/AdjacentVertical/deleteAdjacentVertical/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/AdjacentVertical/updateAdjacentVertical',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/AdjacentVertical/getAdjacentVerticalPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/AdjacentVertical/getPointSelector',
    method: 'post',
    data: data
  })
}
