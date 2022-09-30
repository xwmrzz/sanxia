import request from "@/utils/request";

export function chartRainfall(data) {
  return request({
    url: '/Precipitation/PrecipitationChart',
    method: 'post',
    data: data
  })
}
