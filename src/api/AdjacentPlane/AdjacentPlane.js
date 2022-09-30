import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/AdjacentPlane/getAdjacentPlaneList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/AdjacentPlane/addAdjacentPlane',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/AdjacentPlane/deleteAdjacentPlane/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/AdjacentPlane/updateAdjacentPlane',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/AdjacentPlane/getAdjacentPlanePointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/AdjacentPlane/getPointSelector',
    method: 'post',
    data: data
  })
}

