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
	Sidebar,
	SidebarItem,
	Tag,
	Icon,
	Card,
	ActionBar,
	ActionBarIcon,
	ActionBarButton,
	Form,
	Field,
	Button,
	ContactCard,
	AddressEdit,
	SwipeCell,
	Stepper,
	Checkbox,
	CheckboxGroup,
	SubmitBar
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
app.use(Sidebar)
app.use(SidebarItem)
app.use(Tag)
app.use(Icon)
app.use(Card)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(Form)
app.use(Field)
app.use(Button)
app.use(ContactCard)
app.use(AddressEdit)
app.use(SwipeCell)
app.use(Stepper)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(SubmitBar)

app.mount('#app')
