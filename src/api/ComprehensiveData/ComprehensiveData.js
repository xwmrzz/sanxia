import request from "@/utils/request";

export function listSeepage(data) {
  console.log('request getlist')
  return request({
    url: '/seepage/listSeepage',
    method: 'post',
    data: data
  })
}

export function addSeepage(data) {
  return request({
    url: '/seepage/addSeepage',
    method: 'post',
    data: data
  })
}
export function deleteSeepage(id) {
  return request({
    url: '/seepage/deleteSeepage/' + id,
    method: 'delete'
  })
}

export function updateSeepage(data) {
  return request({
    url: '/seepage/updateSeepage',
    method: 'put',
    data
  })
}
export function getSeepage(data) {
  return request({
    url: '/seepage/getSeepage',
    method: 'get',
    params: data
  })
}
