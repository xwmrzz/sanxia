import request from "@/utils/request";

export function GetList(data) {
  return request({
		url: '/MessageInfo/getMessageInfo',
    method: 'post',
    data: data
  })
}