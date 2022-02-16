// 日纵向
import request from "@/utils/request";

export function listDVertical(data) {
  return request({
    url: '/mvertical/listDVertical',
    method: 'post',
    data: data
  })
}
export function addDVertical(data) {
  return request({
    url: '/mvertical/addDVertical',
    method: 'post',
    data: data
  })
}
export function deleteDVertical(id) {
  return request({
    url: '/mvertical/deleteDVertical/'+ id,
    method: 'delete'
  })
}

export function updateDVertical(data) {
  return request({
    url: '/mvertical/updateDVertical',
    method: 'put',
    data
  })
}
export function getDVertival(data) {
  return request({
    url: '/mvertical/getDVertival',
    method: 'get',
    params: data
  })
}
