<template>
	<van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
	<section class="register-container">
		<van-form @submit="onSubmit">
			<van-field
				v-model="state.name"
				name="name"
				label="昵称"
				placeholder="昵称"
				:rules="[
					{ required: true, message: '请填写昵称' },
					{ pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '请输入2-5位的昵称' }
				]"
			/>
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
			<van-field
				v-model="state.password_confirmation"
				type="password"
				name="password_confirmation"
				label="确认密码"
				placeholder="确认密码"
				:rules="[
					{ required: true, message: '请确认密码' },
					{ pattern: /^[a-zA-Z0-9_+@]{6,14}$/, message: '请输入6-14位密码' }
				]"
			/>
			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>

		<a href="javascript:;" @click="goLogin">已有账号, 去登录</a>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { register } from '@/api/login'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
	name: 'Register',
	mixins: [navBarLeftBtn],

	setup() {
		const router = useRouter()

		const state = reactive({
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
		})
		const onSubmit = values => {
			if (state.password !== state.password_confirmation) return Toast.fail('两次密码不一致')

			register(state)
				.then(res => {
					if (res.status !== 201) return Toast.fail('注册失败')

					Toast.success('注册成功')
					setTimeout(() => {
						router.push({
							path: '/login'
						})
					}, 1000)
				})
				.catch(err => {
					console.log(err.message)
				})
		}

		const goLogin = () => {
			router.push({
				path: '/login'
			})
		}

		return {
			state,
			onSubmit,
			goLogin
		}
	}
}
</script>

<style scoped lang="less">
.register-container {
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
