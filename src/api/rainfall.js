import request from "@/utils/request";

export function chartRainfall(data) {
  return request({
    url: '/rainfall/chartRainfall',
    method: 'post',
    data: data
  })
}
