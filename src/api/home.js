import request from '@/utils/request'

export function getHomeData() {
	return request({
		method: 'GET',
		url: '/api/index'
	})
}
