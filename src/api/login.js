import request from '@/utils/request'

export function register(info) {
	return request({
		method: 'POST',
		url: '/api/auth/register',
		data: info
	})
}

export function login(info) {
	return request({
		method: 'POST',
		url: '/api/auth/login',
		data: info
	})
}
