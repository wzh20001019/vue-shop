<template>
	<section>
		<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
		category
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'
export default {
	name: 'Category',
	mixins: [navBarLeftBtn]
}
</script>

<style scoped lang="less"></style>
