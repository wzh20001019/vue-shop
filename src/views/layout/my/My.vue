<template>
	<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />

	<section class="my-container" v-if="store.state.token == ''">
		<div class="user-box">
			<div class="img-box">
				<img :src="info.avatar_url" alt="" />
			</div>
			<div class="out-content">
				未登录
			</div>
		</div>
		<van-button class="goLogin" type="primary" block @click="goLogin">登录</van-button>
	</section>

	<section class="my-container" v-else>
		<div class="user-box">
			<div class="img-box">
				<img :src="info.avatar_url" alt="" />
			</div>
			<div class="user-info-box">
				<div class="nikename">
					昵称:&nbsp;&nbsp; <span>{{ info.name }}</span>
				</div>
				<div class="email">
					邮箱: &nbsp;&nbsp; <span>{{ info.email }}</span>
				</div>
				<div class="phone" v-if="!info.phone">手机号:&nbsp;&nbsp; <span>未绑定</span></div>
				<div class="phone" v-else>
					手机号:&nbsp;&nbsp; <span>{{ info.phone }}</span>
				</div>
			</div>
		</div>

		<div class="my-main-box">
			<ul>
				<li>
					<span>我的订单</span>
					<van-icon name="arrow" />
				</li>
				<li>
					<span>售后服务</span>
					<van-icon name="arrow" />
				</li>
				<li>
					<span>账号管理</span>
					<van-icon name="arrow" />
				</li>
				<li>
					<span>联系客服</span>
					<van-icon name="arrow" />
				</li>
				<li>
					<span>关于我们</span>
					<van-icon name="arrow" />
				</li>
			</ul>
		</div>
		<div>{{ store.token }}</div>
		<van-button type="danger" class="outBtn" block @click="outLogin">退出登录</van-button>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getUserInfo, loginOut } from '@/api/user'
import { Toast, Dialog } from 'vant'
export default {
	name: 'My',
	mixins: [navBarLeftBtn],

	setup() {
		const store = useStore()
		const router = useRouter()

		let user = reactive({
			info: {}
		})

		onMounted(() => {
			if (store.state.token !== '') {
				getUserInfo()
					.then(res => {
						if (res.status !== 200) return Toast.fail('获取信息失败')

						user.info = res.data
					})
					.catch(err => {
						console.log(err.message)
					})
			}
		})

		const outLogin = () => {
			Dialog.confirm({
				title: '退出登录',
				message: '确定要退出登录吗'
			})
				.then(() => {
					if (store.state.token !== '') {
						loginOut()
							.then(res => {
								store.commit('updateToken', '')
							})
							.catch(err => {
								console.log(err.message)
							})
					}
				})
				.catch(() => {
					//...
				})
		}

		const goLogin = () => {
			router.push('/login')
		}

		return {
			...toRefs(user),
			outLogin,
			store,
			goLogin
		}
	}
}
</script>

<style scoped lang="less">
.my-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;

	.user-box {
		display: flex;
		justify-content: space-between;
		margin: 20px auto;
		width: 94%;
		height: 250px;
		background: linear-gradient(240deg, #0162c8, #55e7fc);
		border-radius: 30px;
		overflow: hidden;

		.img-box {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-left: 10px;
			width: 30%;
			height: 250px;

			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #fff;
				box-shadow: 0 0 15px #000;
				background-color: gray;
			}
		}

		.out-content {
			display: flex;
			align-items: center;
			padding: 0 40px;
			width: 60%;
			height: 250px;
			font-size: 32px;
			color: #fff;
			box-sizing: border-box;
		}

		.user-info-box {
			padding: 25px 0;
			width: 60%;
			height: 250px;
			font-size: 32px;
			color: #111;

			div {
				margin-top: 20px;
			}

			.nikename span {
				color: #ff9900;
			}

			.email span {
				color: #d97aff;
			}

			.phone span {
				font-size: 28px;
				color: #03e06e;
			}
		}
	}

	.my-main-box {
		margin: 50px auto 0;
		width: 94%;
		background: #fff;

		ul li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20px;
			padding: 0 10px;
			width: 100%;
			height: 100px;
			font-size: 34px;
			box-sizing: border-box;

			.van-icon {
				font-size: 40px;
			}
		}

		ul li:first-child {
			margin-top: 0;
		}
	}

	.outBtn {
		position: fixed;
		left: 50%;
		bottom: 140px;
		transform: translateX(-50%);
		width: 90%;
		border-radius: 44px;
	}

	.goLogin {
		margin-top: 200px;
		margin-left: 5%;
		width: 90%;
		border-radius: 44px;
		background: linear-gradient(to left, #0162c8, #55e7fc);
	}
}
</style>
