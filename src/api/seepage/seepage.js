import request from "@/utils/request";

export function allMSeepage(data) {
  return request({
    url: '/mseepage/allMSeepage',
    method: 'post',
    data: data
  })
}


export function addMSeepage(data) {
  return request({
    url: '/mseepage/addMSeepage',
    method: 'post',
    data: data
  })
}
export function deleteMSeepage(id) {
  return request({
    url: '/mseepage/deleteMSeepage/'+ id,
    method: 'delete'
  })
}

export function updateMSeepage(data) {
  return request({
    url: '/mseepage/updateMSeepage',
    method: 'put',
    data
  })
}
export function getMSeepage(data) {
  return request({
    url: '/mseepage/getMSeepage',
    method: 'get',
    params: data
  })
}
