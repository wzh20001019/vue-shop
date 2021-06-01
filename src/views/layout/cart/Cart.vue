<template>
	<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />

	<section class="cart-container" v-if="cartList.length !== 0">
		<div class="address-container">
			<div class="address-show-box" v-if="Object.keys($store.state.address) == 0">
				<van-button icon="plus" type="primary" round @click.native="$router.push('/address')"
					>新增地址</van-button
				>
			</div>

			<div class="address-hide-box" v-else @click="$router.push('/address')">
				<div class="name-box">
					姓名: &nbsp;<span>{{ $store.state.address.name }}</span>
				</div>
				<div class="phone-box">
					手机号: &nbsp;<span>{{ $store.state.address.phone }}</span>
				</div>
				<div class="address-box">
					收货地址: &nbsp;<span>{{ $store.state.address.addressInfo }}</span>
				</div>
			</div>
		</div>

		<section class="cartList-box" v-if="total !== 0">
			<van-swipe-cell v-for="(item, index) in cartList" :key="index">
				<van-checkbox
					v-model="item.checked"
					checked-color="#cc0000"
					@click="checkedClick"
					icon-size="24px"
				></van-checkbox>
				<van-card
					:num="item.num"
					:price="item.price"
					:title="item.title"
					class="goods-card"
					:thumb="item.cover_url"
				/>
				<van-stepper
					v-model="item.num"
					min="1"
					theme="round"
					button-size="24"
					disable-input
					@change="numChange"
				/>
				<template #right>
					<van-button
						square
						text="删除"
						type="danger"
						class="delete-button"
						@click="removeClick(index)"
					/>
				</template>
			</van-swipe-cell>
		</section>

		<van-submit-bar :price="total * 100" button-text="提交订单" @submit="onSubmit" />
		<van-checkbox
			class="qx"
			v-model="checked"
			checked-color="#cc0000"
			icon-size="24px"
			@click="qxClick"
		></van-checkbox>
	</section>

	<div class="cart-container air" v-else>
		空
	</div>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

import { getCartList } from '../../../api/cart'
import { getDetailAllData } from '../../../api/detail'
export default {
	name: 'Cart',
	mixins: [navBarLeftBtn],

	setup() {
		// const route = useRoute()
		const store = useStore()

		let cartNum = ref([])
		let cartList = ref([
			{
				goods_id: '',
				title: '',
				cover_url: '',
				price: 0,
				num: 0,
				checked: true
			},
			{
				goods_id: '',
				title: '',
				cover_url: '',
				price: 0,
				num: 0,
				checked: true
			},
			{
				goods_id: '',
				title: '',
				cover_url: '',
				price: 0,
				num: 0,
				checked: true
			}
		])

		let newCartList = ref([])
		let count = ref(0)
		let total = ref(0)
		let checked = ref(false)

		onMounted(() => {
			if (total !== 0) {
				checked.value = true
			}

			if (store.state.token !== '') {
				getCartList()
					.then(res => {
						cartNum.value = res.data.data

						cartNum.value.forEach((item, index) => {
							getDetailAllData(item.goods_id)
								.then(res => {
									cartList.value[index].title = res.data.goods.title || ''
									cartList.value[index].cover_url = res.data.goods.cover_url || ''
									cartList.value[index].price = Number(res.data.goods.price).toFixed(2) || ''
									cartList.value[index].num = cartNum.value[index].num || ''
									cartList.value[index].goods_id = cartNum.value[index].goods_id || ''

									total.value += cartNum.value[index].num * cartList.value[index].price
								})
								.catch(err => {
									console.log(err.message)
								})
						})

						count.value = cartNum.value.reduce((num, item) => (num += item.num), 0)

						store.commit('updateCount', count.value)
					})
					.catch(err => console.log(err.message))
			}
		})

		function cart() {
			newCartList.value = cartList.value.filter(item => {
				return item.checked == true
			})

			if (newCartList.value.length > 0) {
				count.value = newCartList.value.reduce((num, item) => (num += item.num), 0)
				total.value = newCartList.value.reduce((num, item) => (num += +item.price * item.num), 0)

				store.commit('updateCount', count.value)
			} else {
				total.value = 0
				count.value = 0

				store.commit('updateCount', count.value)
			}
		}

		const numChange = () => {
			cart()
		}

		const checkedClick = () => {
			cart()

			let flag = cartList.value.some(item => {
				return item.checked == false
			})

			if (flag) {
				checked.value = false
			} else {
				checked.value = true
			}
		}

		const onSubmit = () => {
			return Toast.fail('不能提交')
		}

		const qxClick = () => {
			cartList.value.forEach(item => {
				item.checked = checked.value
			})
		}

		const removeClick = index => {
			cartList.value.splice(index, 1)

			if (cartList.value.length == 0) {
				checked.value = false
			}

			cart()
		}

		return {
			cartList,
			numChange,
			checkedClick,
			qxClick,
			onSubmit,
			checked,
			total,
			removeClick
		}
	}
}
</script>

<style scoped lang="less">
.cart-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
	background-color: #eee;

	.address-container {
		margin: 10px auto;
		width: 96%;
		height: 160px;
		border-radius: 20px;
		background: rgb(145, 227, 255);

		.address-show-box {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.van-button {
				height: 60px;
				background: #07c160;
				border-color: #07c160;
			}
		}

		.address-hide-box {
			display: flex;
			flex-wrap: wrap;
			padding: 20px 20px;
			font-size: 30px;
			font-weight: 600;

			.name-box {
				width: 50%;
			}
			.phone-box {
				width: 50%;
			}
			.address-box {
				margin-top: 50px;

				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			span {
				font-weight: 400;
				color: #ff9900;
			}
		}
	}

	.van-submit-bar {
		bottom: 98px;
	}

	.qx {
		position: fixed;
		left: 30px;
		bottom: 120px;
		z-index: 100;
	}
}

.goods-card {
	margin: 0;
	background-color: #fff;
}

.delete-button {
	height: 100%;
}

.cartList-box {
	margin-top: 20px;
}

.cartList-box {
	/deep/.van-card__num {
		float: right;
		position: absolute;
		right: 10px;
		top: 10px;
		color: #969799;
	}

	.van-stepper {
		display: inline-block;
		bottom: 20px;
		right: 32px;
		position: absolute;
		-webkit-user-select: none;
		user-select: none;
	}

	/deep/.van-card__title {
		color: #917833;
		margin-top: 40px;
	}

	/deep/.van-card__price {
		color: #cc0000;
	}

	.goods-card[data-v-17548344] {
		margin: 0;
		padding-left: 70px;
		background-color: #fff;
	}

	.van-checkbox {
		position: absolute;
		left: 30px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 99;
	}
}

.air {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50px;
	color: #cc0000;
}
</style>
