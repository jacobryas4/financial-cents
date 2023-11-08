import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import clickOutside from './directives/clickOutside'

createApp(App).directive('click-outside', clickOutside).mount('#app')
// App.directive('click-outside', clickOutside)
