import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [  
  
  {
    path: "/login",
    name: 'login',
    component: LoginView
  },
  {
    path: "/register",
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      template: '<p>Page Not Found</p>'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
