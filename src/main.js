import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem, NavBar, Button } from 'vant'

import 'amfe-flexible'
// import 'vant/lib/index.css' //导入css样式
import './style/index.less' //导入自己的样式

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Button)

app.mount('#app')
