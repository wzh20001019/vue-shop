<template>
	<van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft" />
	<section class="address-add-container">
		<van-address-edit
			:area-list="areaList"
			:show-postal="false"
			:show-delete="false"
			:show-set-default="false"
			show-search-result
			:search-result="searchResult"
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
			@change-detail="onChangeDetail"
		/>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { areaList } from '@vant/area-data'

export default {
	name: 'Address',
	mixins: [navBarLeftBtn],

	setup() {
		const searchResult = ref([])

		const router = useRouter()
		const store = useStore()

		let address = reactive({
			name: '',
			phone: '',
			addressInfo: ''
		})

		const onSave = content => {
			address.name = content.name
			address.phone = content.tel
			address.addressInfo = content.province + content.city + content.county + content.addressDetail

			store.commit('updateAddress', address)

			router.push({
				path: '/cart'
			})
		}

		const onChangeDetail = val => {
			if (val) {
				searchResult.value = [
					{
						name: 'default1',
						address: 'default1地址'
					},
					{
						name: 'default2',
						address: 'default2地址'
					}
				]
			} else {
				searchResult.value = []
			}
		}

		return {
			onSave,
			areaList,
			searchResult,
			onChangeDetail
		}
	}
}
</script>

<style scoped lang="less">
.address-add-container {
	margin: 120px 0;
}

/deep/.van-address-edit__buttons .van-button {
	border: 1px solid red;
}
</style>
