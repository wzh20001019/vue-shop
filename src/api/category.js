import request from '@/utils/request'

export function getCategoryData() {
	return request({
		methods: 'GET',
		url: '/api/goods'
	})
}
