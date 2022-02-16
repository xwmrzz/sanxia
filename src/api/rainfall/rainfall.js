import request from "@/utils/request";


export function listRainfall(data) {
  return request({
    url: '/rainfall/listRainfall',
    method: 'post',
    data: data
  })
}

export function addRainfall(data) {
  return request({
    url: '/rainfall/addRainfall',
    method: 'post',
    data: data
  })
}
export function deleteRainfall(id) {
  return request({
    url: '/rainfall/deleteRainfall/'+ id,
    method: 'delete'
  })
}

export function updateRainfall(data) {
  return request({
    url: '/rainfall/updateRainfall',
    method: 'put',
    data
  })
}
export function getRainfall(data) {
  return request({
    url: '/rainfall/getYVertical',
    method: 'get',
    params: data
  })
}
