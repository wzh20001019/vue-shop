import { createStore } from 'vuex'

export default createStore({
	state: {
		token: localStorage.getItem('token') || ''
	},
	mutations: {
		updateToken(state, token) {
			state.token = token

			localStorage.setItem('token', token)
		}
	},
	actions: {},
	modules: {}
})
