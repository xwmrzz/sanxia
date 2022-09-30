import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/Elevation/getElevation',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/Elevation/addElevation',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/Elevation/deleteElevation/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/Elevation/updateElevation',
    method: 'put',
    data
  })
}
