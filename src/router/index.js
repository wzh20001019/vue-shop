import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'LayoutIndex',
		component: () => import('@/views/layout/index/Index.vue'),

		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('@/views/layout/home/Home.vue')
			},
			{
				path: 'category',
				name: 'Category',
				component: () => import('@/views/layout/category/Category.vue')
			},
			{
				path: 'cart',
				name: 'Cart',
				component: () => import('@/views/layout/cart/Cart.vue')
			},
			{
				path: 'my',
				name: 'My',
				component: () => import('@/views/layout/my/My.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/Login.vue')
	},
	{
		path: '/detail',
		name: 'Detail',
		component: () => import('@/views/good-detail/good-detail.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
