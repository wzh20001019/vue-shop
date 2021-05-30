import request from '@/utils/request'

export function getUserInfo() {
	return request({
		method: 'GET',
		url: '/api/user'
	})
}

export function loginOut() {
	return request({
		method: 'POST',
		url: '/api/auth/logout'
	})
}
