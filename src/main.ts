import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { Button, Loading, Empty, Toast, ImagePreview, Dialog } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'

const app = createApp(App)
app.use(createPinia()).use(router)
app.use(Button).use(Loading).use(Empty).use(Toast).use(ImagePreview).use(Dialog)
app.mount('#app')
