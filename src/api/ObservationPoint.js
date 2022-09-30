import request from "@/utils/request";


export function GetData(data) {
  return request({
		url: '/ObservationPoint/'+data.url,
    method: 'post',
    data: data
  })
}