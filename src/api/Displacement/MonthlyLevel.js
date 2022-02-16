// 日水平
import request from "@/utils/request";

export function listDHorizontal(data) {
  return request({
    url: '/dhorizontal/listDHorizontal',
    method: 'post',
    data: data
  })
}
export function addDHorizontal(data) {
  return request({
    url: '/dhorizontal/addDHorizontal',
    method: 'post',
    data: data
  })
}
export function deleteDHorizontal(id) {
  return request({
    url: '/dhorizontal/deleteDHorizontal/'+ id,
    method: 'delete'
  })
}

export function updateDHorizontal(data) {
  return request({
    url: '/dhorizontal/updateDHorizontal',
    method: 'put',
    data
  })
}
export function getDHorizontal(data) {
  return request({
    url: '/dhorizontal/getDHorizontal',
    method: 'get',
    params: data
  })
}
