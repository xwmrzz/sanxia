import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/FirstPlane/getFirstPlaneList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/FirstPlane/addFirstPlane',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/FirstPlane/deleteFirstPlane/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/FirstPlane/updateFirstPlane',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/FirstPlane/getFirstPlanePointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/FirstPlane/getPointSelector',
    method: 'post',
    data: data
  })
}