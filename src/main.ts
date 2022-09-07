import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueSocialSharing from 'vue-social-sharing'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueSocialSharing);
app.mount('#app')
