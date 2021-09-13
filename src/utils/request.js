import axios from 'axios'

const request = axios.create({
	baseURL: 'https://api.shop.eduwork.cn'
})

//请求拦截
request.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')

		if (token) {
			config.headers.Authorization = 'Bearer ' + token
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//响应拦截
request.interceptors.response.use(
	results => {
		return results
	},
	error => {
		return Promise.reject(error)
	}
)

export default request
