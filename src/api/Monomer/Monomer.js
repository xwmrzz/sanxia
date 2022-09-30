import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/Monomer/getMonomer',
    method: 'post',
    data: data
  })
}

export function GetPointList(data) {
  return request({
		url: '/Monomer/getMonomerPointList',
    method: 'post',
    data: data
  })
}
