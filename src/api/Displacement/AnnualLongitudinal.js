// 年纵向
import request from "@/utils/request";

export function listYVertical(data) {
  return request({
    url: '/yvertical/listYVertical',
    method: 'post',
    data: data
  })
}

export function addYVertical(data) {
  return request({
    url: '/yvertical/addYVertical',
    method: 'post',
    data: data
  })
}
export function deleteYVertical(id) {
  return request({
    url: '/yvertical/deleteYVertical/'+ id,
    method: 'delete'
  })
}

export function updateYVertical(data) {
  return request({
    url: '/yvertical/updateYVertical',
    method: 'put',
    data
  })
}
export function getYVertical(data) {
  return request({
    url: '/yvertical/getYVertical',
    method: 'get',
    params: data
  })
}
