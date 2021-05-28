<template>
	<router-view />

	<!-- <router-view v-slot="{ Component }">
		<transition>
			<keep-alive clude="Home">
				<component :is="Component" />
			</keep-alive>
		</transition>
	</router-view> -->
</template>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
