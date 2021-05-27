<template>
	<section>
		<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
		my
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'
export default {
	name: 'My',
	mixins: [navBarLeftBtn]
}
</script>

<style scoped lang="less"></style>
