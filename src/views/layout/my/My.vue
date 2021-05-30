<template>
	<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />

	<section class="my-container"></section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { onMounted } from 'vue'
import { getUserInfo } from '@/api/user'
import { Toast } from 'vant'
export default {
	name: 'My',
	mixins: [navBarLeftBtn],

	setup() {
		onMounted(() => {
			getUserInfo()
				.then(res => {
					if (res.status !== 200) return Toast.fail('获取信息失败')
					console.log(res)
				})
				.catch(err => {
					console.log(err.message)
				})
		})
	}
}
</script>

<style scoped lang="less">
.my-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
}
</style>
