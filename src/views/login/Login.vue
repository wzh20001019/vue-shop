<template>
	<van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
	<section class="login-container">
		<van-form @submit="onSubmit">
			<van-field
				v-model="state.email"
				name="email"
				label="邮箱"
				placeholder="邮箱"
				:rules="[
					{ required: true, message: '请输入邮箱' },
					{ pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, message: '邮箱格式错误' }
				]"
			/>
			<van-field
				v-model="state.password"
				type="password"
				name="password"
				label="密码"
				placeholder="密码"
				:rules="[
					{ required: true, message: '请输入密码' },
					{ pattern: /^[a-zA-Z0-9_+@]{6,14}$/, message: '请输入6-14位密码' }
				]"
			/>
			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>
		<a href="javascript:;" @click="goRegister">暂无账号, 去注册</a>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { login } from '@/api/login'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
	name: 'Login',
	mixins: [navBarLeftBtn],

	setup() {
		const router = useRouter()
		const store = useStore()

		const state = reactive({
			email: '',
			password: ''
		})
		const onSubmit = values => {
			login(state)
				.then(res => {
					if (res.status !== 200) return Toast.fail('邮箱或密码错误')

					Toast.success('登陆成功')
					store.commit('updateToken', res.data.access_token)

					setTimeout(() => {
						router.push('/my')
					}, 1000)
				})
				.catch(err => {
					console.log(err.message)
				})
		}

		const goRegister = () => {
			router.push({
				path: '/register'
			})
		}

		return {
			state,
			onSubmit,
			goRegister
		}
	}
}
</script>

<style scoped lang="less">
.login-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;
	padding: 60px 0 0 0;

	a {
		float: right;
		margin-right: 40px;
		margin-top: 40px;
		font-size: 30px;
		color: #755bea;
	}
}
</style>
