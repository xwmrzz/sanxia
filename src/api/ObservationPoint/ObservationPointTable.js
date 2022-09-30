import request from "@/utils/request";


export function getPointList(data) {
  return request({
		url: '/ObservationPoint/getPointList',
    method: 'get',
    data: data
  })
}


