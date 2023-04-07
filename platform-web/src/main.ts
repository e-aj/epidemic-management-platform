import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router/index'
import { createPinia } from 'pinia'
const pinia = createPinia()


const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')
