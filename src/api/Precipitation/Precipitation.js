import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/Precipitation/getPrecipitationList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/Precipitation/addPrecipitation',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/Precipitation/deletePrecipitation/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/Precipitation/updatePrecipitation',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/Precipitation/getPrecipitationPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/Precipitation/getPointSelector',
    method: 'post',
    data: data
  })
}