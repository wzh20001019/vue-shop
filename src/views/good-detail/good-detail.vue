<template>
	<van-nav-bar :title="text" left-arrow @click-left="onClickLeft" />
	<section class="detail-container" v-cloak>
		<van-swipe :autoplay="3000" @change="imgChange" @click="imgClick">
			<van-swipe-item>
				<img :src="content.cover_url" alt="" />
			</van-swipe-item>
			<van-swipe-item>
				<img :src="content.cover_url" alt="" />
			</van-swipe-item>
			<van-swipe-item>
				<img :src="content.cover_url" alt="" />
			</van-swipe-item>
			<van-swipe-item>
				<img :src="content.cover_url" alt="" />
			</van-swipe-item>
			<template #indicator="{ active }">
				<div class="custom-indicator">{{ active + 1 }}/4</div>
			</template>
		</van-swipe>

		<div class="good_content">
			<div v-show="Object.keys(content).length !== 0">
				<div class="title">
					<span class="text">{{ content.title }}</span>
					<van-tag plain type="danger">畅销书</van-tag>
				</div>

				<div class="description">{{ content.description }}</div>

				<div class="price" v-cloak>￥{{ price }}</div>

				<div :class="{ 'star-box': true, active: isActive }" @click="starClick">
					<van-icon name="star-o" />
					<div class="star_count">{{ content.collects_count }}</div>
				</div>
			</div>
		</div>

		<div class="tab-box">
			<van-tabs v-model:active="active2" sticky>
				<van-tab title="概述">
					<div v-html="content.details"></div>
				</van-tab>
				<van-tab title="热评">
					<div v-if="content.comments.length == 0" class="comments">暂无热评</div>
					<div v-else class="comments">{{ content.comments }}</div>
				</van-tab>
				<van-tab title="相关书籍">
					<van-card
						v-for="(item, index) in likeGoods"
						:key="index"
						tag="畅销"
						:num="item.sales"
						:price="Number(item.price).toFixed(2)"
						:title="item.title"
						:thumb="item.cover_url"
						origin-price="100.00"
						@click.native="goodClick(item.id)"
					/>
				</van-tab>
			</van-tabs>
		</div>
	</section>

	<van-action-bar>
		<van-action-bar-icon icon="chat-o" text="客服" color="#55e7fc" />
		<van-action-bar-icon
			icon="cart-o"
			text="购物车"
			:badge="$store.state.count"
			color="#ee0a24"
			to="/cart"
		/>
		<van-action-bar-icon icon="shop-o" text="店铺" color="#FF9900" />
		<van-action-bar-button type="warning" text="加入购物车" @click="onClickButton" />
		<van-action-bar-button type="danger" text="立即购买" />
	</van-action-bar>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'
import { getDetailAllData } from '@/api/detail'
// import { addCart } from '../../api/cart'

import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Toast, ImagePreview } from 'vant'
export default {
	name: 'GoodDetail',
	mixins: [navBarLeftBtn],

	setup() {
		const route = useRoute()
		const router = useRouter()
		const store = useStore()

		let isActive = ref(false)
		let count = ref(0)

		let goods = reactive({
			content: {}
		})
		let likeGoods = ref([])

		let active = ref(0)
		let active2 = ref(0)

		onMounted(() => {
			getDetailAllData(route.query.id)
				.then(res => {
					goods.content = res.data.goods
					likeGoods.value = res.data.like_goods.splice(0, 5)

					count = goods.content.collects_count
				})
				.catch(err => {
					return Toast.fail('获取信息失败')
				})
		})

		const imgChange = index => {
			active.value = index
		}

		let price = computed(() => {
			return Number(goods.content.price).toFixed(2)
		})

		let text = computed(() => {
			return goods.content.title
		})

		const imgClick = e => {
			ImagePreview({
				images: [
					goods.content.cover_url,
					goods.content.cover_url,
					goods.content.cover_url,
					goods.content.cover_url
				],
				startPosition: active.value
			})
		}

		const starClick = () => {
			isActive.value = !isActive.value
			goods.content.collects_count == count
				? (goods.content.collects_count += 1)
				: (goods.content.collects_count -= 1)
		}

		const goodClick = id => {
			return Toast('商品ID' + id)
		}

		const onClickButton = () => {
			if (store.state.token === '') {
				return router.push({
					path: '/login'
				})
			}

			let data = {
				goods_id: goods.content.id,
				num: 1
			}

			store.dispatch('addCarts', data)

			// addCart(data)
			// 	.then(res => {
			// 		console.log(res)
			// 	})
			// 	.catch(err => {
			// 		console.log(err.message)
			// 	})
			//...
		}

		return {
			...toRefs(goods),
			likeGoods,
			active,
			imgChange,
			imgClick,
			price,
			text,
			isActive,
			starClick,
			active2,
			goodClick,
			onClickButton
		}
	}
}
</script>

<style scoped lang="less">
.detail-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
}

.custom-indicator {
	position: absolute;
	right: 5px;
	bottom: 5px;
	padding: 2px 5px;
	font-size: 32px;
	color: lightseagreen;
	background: rgba(0, 0, 0, 0.1);
}

.van-swipe {
	height: 800px;

	img {
		width: 100%;
		height: 100%;
	}
}

.good_content {
	position: relative;
	margin: 20px 0;
	padding: 30px 20px 0 20px;
	width: 750px;
	height: 180px;
	font-size: 28px;
	box-sizing: border-box;

	.description {
		margin: 20px 0;
		color: gray;
	}

	.price {
		font-size: 36px;
		color: #cc0000;
	}

	.star-box {
		position: absolute;
		right: 40px;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 60px;

		.star_count {
			margin-top: 10px;
			text-align: center;
		}
	}

	.active {
		color: #ff9900;
	}
}

.van-icon {
	font-size: 40px;
}

.tab-box {
	margin-top: 40px;

	.comments {
		text-align: center;
		padding: 40px 0 600px 0;
		font-size: 30px;
		color: gray;
	}
}

/deep/.van-sticky--fixed {
	position: fixed;
	top: 90px !important;
	z-index: 99;
}

.van-tab__pane,
.van-tab__pane-wrapper {
	padding-bottom: 70px;
}
</style>
