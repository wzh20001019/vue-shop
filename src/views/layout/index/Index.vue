<template>
	<section class="index-container">
		<router-view />

		<van-tabbar v-model="active" route>
			<van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
			<van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
			<van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
			<van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
		</van-tabbar>
	</section>
</template>

<script>
import { ref } from 'vue'
export default {
	name: 'Index',
	setup() {
		let active = ref(0)

		return {
			active
		}
	}
}
</script>

<style lang="less" scoped>
.van-tabbar {
	background-color: #ddd;
}
</style>
