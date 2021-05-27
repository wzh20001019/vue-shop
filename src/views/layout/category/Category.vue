<template>
	<section>
		<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
		<div class="wrapper" ref="scroll">
			<div class="content">
				<van-dropdown-menu>
					<van-dropdown-item v-model="state.value1" :options="option1" />
					<van-dropdown-item v-model="state.value2" :options="option2" />
				</van-dropdown-menu>
			</div>
		</div>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'
export default {
	name: 'Category',
	mixins: [navBarLeftBtn]
}
</script>

<style scoped lang="less">
.wrapper {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
	overflow: hidden;
}
</style>
