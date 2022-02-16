// 年水平
import request from "@/utils/request";

export function listYHorizontal(data) {
  return request({
    url: '/yhorizontal/listYHorizontal',
    method: 'post',
    data: data
  })
}
export function addYHorizontal(data) {
  return request({
    url: '/yhorizontal/addYHorizontal',
    method: 'post',
    data: data
  })
}
export function deleteYHorizontal(id) {
  return request({
    url: '/yhorizontal/deleteYHorizontal/'+ id,
    method: 'delete'
  })
}

export function updateYHorizontal(data) {
  return request({
    url: '/yhorizontal/updateYHorizontal',
    method: 'put',
    data
  })
}
export function getYHorizontal(data) {
  return request({
    url: '/yhorizontal/getYHorizontal',
    method: 'get',
    params: data
  })
}
