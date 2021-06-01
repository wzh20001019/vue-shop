import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'LayoutIndex',
		component: () => import('@/views/layout/index/Index.vue'),
		title: '首页',

		children: [
			{
				path: '',
				name: '首页',
				component: () => import('@/views/layout/home/Home.vue')
			},
			{
				path: 'category',
				name: '分类',
				component: () => import('@/views/layout/category/Category.vue')
			},
			{
				path: 'cart',
				name: '购物车',
				component: () => import('@/views/layout/cart/Cart.vue')
			},
			{
				path: 'my',
				name: '个人中心',
				component: () => import('@/views/layout/my/My.vue')
			}
		]
	},
	{
		path: '/login',
		name: '登录',
		component: () => import('@/views/login/Login.vue')
	},
	{
		path: '/register',
		name: '注册',
		component: () => import('@/views/login/Register.vue')
	},
	{
		path: '/detail',
		name: '商品详情',
		component: () => import('@/views/good-detail/good-detail.vue')
	},
	{
		path: '/address',
		name: '添加地址',
		component: () => import('@/views/address/Address.vue')
	},
	{
		path: '/:catchAll(.*)',
		name: '错误页面',
		component: () => import('@/views/404/404.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

//即将进入目标路由之前
router.beforeEach((to, from) => {
	document.title = to.name //设置标题内容
})

//即将进入目标路由之后
router.afterEach((to, from) => {})

export default router
