import request from '@/utils/request'

export function getUserInfo() {
	return request({
		method: 'GET',
		url: '/api/user'
	})
}
