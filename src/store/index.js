import { createStore } from 'vuex'

import { addCart } from '../api/cart'

export default createStore({
	state: {
		token: localStorage.getItem('token') || '',

		address: JSON.parse(localStorage.getItem('address')) || {},

		cartList: [],

		// JSON.parse(localStorage.getItem('total')) ||
		count: 0
	},

	mutations: {
		updateToken(state, token) {
			state.token = token

			localStorage.setItem('token', token)
		},

		updateAddress(state, address) {
			state.address = address

			localStorage.setItem('address', JSON.stringify(address))
		},

		updateCount(state, count) {
			state.count = count
		}
	},
	actions: {
		//添加商品
		addCarts(content, data) {
			addCart(data)
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err.message)
				})
		}
	},
	modules: {}
})
