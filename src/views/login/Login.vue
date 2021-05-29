<template>
	<van-nav-bar title="Login" left-arrow @click-left="onClickLeft" />
	<section>
		login
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'
export default {
	name: 'Login',
	mixins: [navBarLeftBtn]
}
</script>

<style scoped lang="less"></style>
