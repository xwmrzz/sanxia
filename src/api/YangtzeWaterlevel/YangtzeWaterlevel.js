import request from "@/utils/request";


export function GetList(data) {
  return request({
		url: '/YangtzeWaterlevel/getYangtzeWaterlevelList',
    method: 'post',
    data: data
  })
}

export function AddList(data) {
  return request({
    url: '/YangtzeWaterlevel/addYangtzeWaterlevel',
    method: 'post',
    data: data
  })
}
export function DeleteList(id) {
  return request({
    url: '/YangtzeWaterlevel/deleteYangtzeWaterlevel/'+ id,
    method: 'delete'
  })
}

export function UpdateList(data) {
  return request({
    url: '/YangtzeWaterlevel/updateYangtzeWaterlevel',
    method: 'put',
    data
  })
}

export function GetPointList(data) {
  return request({
		url: '/YangtzeWaterlevel/getYangtzeWaterlevelPointList',
    method: 'post',
    data: data
  })
}

export function GetPointSelector(data) {
  return request({
		url: '/YangtzeWaterlevel/getPointSelector',
    method: 'post',
    data: data
  })
}
