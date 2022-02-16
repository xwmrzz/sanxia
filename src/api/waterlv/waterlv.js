import request from "@/utils/request";


export function listWaterlv(data) {
  return request({
    url: '/waterlv/listWaterlv',
    method: 'post',
    data: data
  })
}


export function updateWaterlv(data) {
  return request({
    url: '/waterlv/updateWaterlv',
    method: 'put',
    data
  })
}

export function addWaterlv(data) {
  return request({
    url: '/waterlv/addWaterlv',
    method: 'post',
    data: data
  })
}
export function deleteWaterlv(id) {
  return request({
    url: '/waterlv/deleteWaterlv/'+ id,
    method: 'delete'
  })
}

