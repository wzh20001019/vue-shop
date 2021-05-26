<template>
	<section>
		<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
	</section>
</template>

<script>
// import { getHomeData } from '@/api/home'
export default {
	name: 'Home',

	setup() {
		const onClickLeft = () => {
			console.log('onClickLeft')
		}

		return {
			onClickLeft
		}
	}
}
</script>

<style scoped lang="less">
.box {
	width: 500px;
	height: 200px;
	background: var(--bg-color);
}
</style>
