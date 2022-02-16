import request from "@/utils/request";

export function listMSeepage(data) {
  return request({
    url: '/mseepage/listMSeepage',
    method: 'post',
    data: data
  })
}
