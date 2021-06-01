import request from '../utils/request'

export function addCart(data) {
	return request({
		method: 'POST',
		url: '/api/carts',
		data
	})
}

export function getCartList() {
	return request({
		method: 'GET',
		url: '/api/carts'
	})
}
