import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.config.errorHandler = ( err, vm, info ) => {
  console.error(err, '\n', vm, '\n', info);
}
app.config.performance = true
app.mount('#app')
