<template>
	<van-nav-bar title="商城" />

	<div class="wrapper">
		<div class="content">
			<div class="swipe-container">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="#55e7fc" lazy-render>
					<van-swipe-item v-for="(item, index) in slidesList" :key="index">
						<img :src="item.img_url" :alt="item.title" />
					</van-swipe-item>
				</van-swipe>
			</div>

			<section class="grid-container">
				<div
					class="good-box"
					v-for="(item, index) in goodsList"
					:key="index"
					@click.native="gridClick(item.id)"
				>
					<img :src="item.cover_url" :alt="item.description" />
					<span>{{ item.title.replace(/《|》/g, '') }}</span>
				</div>
			</section>

			<section class="tab-container">
				<van-tabs
					v-model:active="active"
					sticky
					offset-top="44px"
					background="#eee"
					duration="0.5"
					title-active-color="#cc0000"
				>
					<van-tab title="畅销">畅销书籍</van-tab>
					<van-tab title="新书">新书书籍</van-tab>
					<van-tab title="精选">精选书籍</van-tab>
				</van-tabs>
			</section>
		</div>
	</div>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeData } from '@/api/home'
import { Toast } from 'vant'

export default {
	name: 'Home',
	mixins: [navBarLeftBtn],

	setup() {
		let slidesList = ref([])
		let goodsList = ref([])
		let active = ref(0)

		const router = useRouter()

		const gridClick = id => {
			router.push({
				path: '/detail',
				query: { id }
			})
		}

		onMounted(() => {
			getHomeData()
				.then(res => {
					slidesList.value = res.data.slides
					goodsList.value = res.data.goods.data.splice(0, 8)
				})
				.catch(err => {
					return Toast.fail('数据获取失败')
				})
		})

		return {
			active,
			slidesList,
			goodsList,
			gridClick
		}
	}
}
</script>

<style scoped lang="less">
.swipe-container {
	width: 100vw;
	height: 350px;
}
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 350px;
	height: 350px;
	text-align: center;

	img {
		width: 100vw;
		height: 350px;
	}
}

.wrapper {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
	// overflow: hidden;
}

.grid-container {
	width: 100vw;
	height: 400px;

	.good-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		float: left;
		width: 25%;
		height: 200px;

		animation: goodMove 0.4s linear;

		img {
			width: 120px;
			height: auto;
		}

		span {
			margin-top: 5px;
			font-size: 20px;
		}
	}
}

@keyframes goodMove {
	0% {
		transform: translateY(200px);
		opacity: 0;
	}
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
}

/deep/.van-tabs__wrap {
	width: 100vw;
}

/deep/.van-tabs {
	background-color: #fff;
}

.tab-container {
	margin-top: 20px;
}

.van-tab__pane,
.van-tab__pane-wrapper {
	text-align: center;
}
</style>
