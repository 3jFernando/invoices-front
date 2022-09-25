import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useUserStore } from '@/store/user'
import router from './router/index'
import routerAdmin from './router/admin'
import App from './App.vue'

(() => {

  const pinia = createPinia();
  const app = createApp(App);

  app.use(pinia);

  const userStore = useUserStore();
  if(userStore.isLoggedIn()) {
    app.use(routerAdmin);    
    if (['/', 'login', 'register'].includes(window.history.state.name)) window.location.assign('/');
  } else {
    app.use(router);
    if (['/', 'login', 'register'].includes(window.history.state.name)) window.location.assign('/login');
  }

  app.use(pinia);
  app.mount('#app')

})();