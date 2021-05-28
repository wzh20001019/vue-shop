<template>
	<section>
		<van-nav-bar title="商城" left-arrow @click-left="onClickLeft" />
		<div class="category-container">
			<div class="sidebar-box">
				<van-sidebar v-model="active" @change="sideChange">
					<van-sidebar-item
						v-for="(item, index) in sideCategoryList"
						:key="index"
						:title="item.name"
					/>
				</van-sidebar>
			</div>
			<div class="tab-box">
				<van-tabs v-model:active="active2" @change="tabChange">
					<van-tab v-for="(item, index) in tabList" :key="index" :title="item">
						<div class="wrapper">
							<div class="content">{{ ct }}</div>
						</div>
					</van-tab>
				</van-tabs>
			</div>
			<!-- <div class="wrapper">
				<div class="content"></div>
			</div> -->
		</div>
	</section>
</template>

<script>
import navBarLeftBtn from '@/mixins/navbar-left-btn'

import { ref, reactive, onMounted, computed } from 'vue'
import { getCategoryData } from '@/api/category'
import { Toast } from 'vant'
export default {
	name: 'Category',
	mixins: [navBarLeftBtn],

	setup() {
		const active = ref(0)
		const active2 = ref(0)

		let sideCategoryList = ref([])
		let goodList = ref([])
		let tabList = ref(['销量', '价格', '评论'])

		let content = reactive({
			side: '前沿',
			tab: '销量'
		})

		onMounted(() => {
			getCategoryData()
				.then(res => {
					sideCategoryList.value = res.data.categories
					goodList.value = res.data.goods
				})
				.catch(err => {
					return Toast.fail('数据获取失败')
				})
		})

		const sideChange = index => {
			content.side = sideCategoryList.value[index].name
		}

		const tabChange = (name, title) => {
			content.tab = title
		}

		let ct = computed(() => {
			return content.side + '+' + content.tab
		})

		return {
			active,
			active2,
			sideCategoryList,
			goodList,
			tabList,
			sideChange,
			tabChange,
			ct
		}
	}
}
</script>

<style scoped lang="less">
.category-container {
	position: absolute;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 100px;

	.tab-box {
		position: absolute;
		top: 0;
		right: 0;
		left: 25%;
		bottom: 0;
		background-color: lightblue;
	}

	.sidebar-box {
		position: absolute;
		top: 88px;
		left: 0;
		right: 75%;
		bottom: 0;
	}

	.wrapper {
		// position: absolute;
		// top: 100px;
		// right: 0;
		// left: 0;
		// bottom: 0;
		// overflow: hidden;
		// background-color: lightcoral;

		display: flex;
		justify-content: center;
		padding: 200px 0;
	}
}

.van-sidebar {
	width: 100%;
}

.van-sidebar-item {
	line-height: 38px;
}

.van-badge__wrapper {
	margin-left: 5px;
}
</style>
