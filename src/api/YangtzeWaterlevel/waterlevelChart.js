import request from "@/utils/request";

export function waterlevelChart(data) {
  return request({
    url: '/YangtzeWaterlevel/WaterlevelChart',
    method: 'post',
    data: data
  })
}