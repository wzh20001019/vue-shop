import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	Tabbar,
	TabbarItem,
	NavBar,
	Swipe,
	SwipeItem,
	Grid,
	GridItem,
	Image as VanImage,
	Tab,
	Tabs,
	DropdownMenu,
	DropdownItem
} from 'vant'

import 'amfe-flexible'
// import 'vant/lib/index.css' //导入css样式
import './style/index.less' //导入自己的样式

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Swipe)
app.use(SwipeItem)
app.use(Grid)
app.use(GridItem)
app.use(VanImage)
app.use(Tab)
app.use(Tabs)
app.use(DropdownMenu)
app.use(DropdownItem)

app.mount('#app')
