import request from '@/utils/request'

export function getDetailAllData(id) {
	return request({
		methods: 'GET',
		url: '/api/goods/' + id
	})
}
