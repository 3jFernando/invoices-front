import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import InvoiceDetails from '@/components/invoices/Details.vue'
import AboutView from '@/views/AboutView.vue'
import InvoicesView from '@/views/InvoicesView.vue'

const routes: Array<RouteRecordRaw> = [  
  {
    path: '/',
    name: 'home',
    component: InvoicesView
  },
  {
    path: '/invoice/:id',
    name: 'invoice-details',
    component: InvoiceDetails
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
