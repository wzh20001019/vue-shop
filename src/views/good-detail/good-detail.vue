<template>
	<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
</template>

<script>
import navBarLeftBtn from '../../mixins/navbar-left-btn'
export default {
	name: 'GoodDetail',
	mixins: [navBarLeftBtn]
}
</script>

<style scoped lang="less"></style>
