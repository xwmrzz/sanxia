import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/FirstVertical/getFirstVerticalList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/FirstVertical/addFirstVertical',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/FirstVertical/deleteFirstVertical/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/FirstVertical/updateFirstVertical',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/FirstVertical/getFirstVerticalPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/FirstVertical/getPointSelector',
    method: 'post',
    data: data
  })
}