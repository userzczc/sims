import { createRouter, createWebHistory } from 'vue-router'
// import SigninView from '../views/SigninView.vue'
const SigninView = () => import('@/views/SigninView.vue')
const MainView = () => import('@/views/MainView.vue')
const Welcome = () => import('@/components/Welcome.vue')
const File = () => import('@/components/File.vue')
const Echarts = () => import('@/components/Echarts.vue')
const LargeScreenView = () => import('@/views/LargeScreenView.vue')
const Role = () => import('@/components/Role.vue')
const User = () => import('@/components/User.vue')
const Lead = () => import('@/components/Lead.vue')
const Opportunity = () => import('@/components/Opportunity.vue')
const Customer = () => import('@/components/Customer.vue')
const Order = () => import('@/components/Order.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      alias: ['/', '/login'],
      name: 'signin',
      component: SigninView,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome,
          meta: {
            title: '欢迎'
          }
        },
        {
          path: 'file',
          name: 'file',
          component: File,
          meta: {
            title: '文件管理'
          }
        },
        {
          path: 'echarts',
          name: 'echarts',
          component: Echarts,
          meta: {
            title: '图表展示'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {
            title: '用户管理'
          }
        },
        {
          path: 'role',
          name: 'role',
          component: Role,
          meta: {
            title: '角色管理'
          }
        },
        {
          path: 'lead',
          name: 'lead',
          component: Lead,
          meta: {
            title: '线索管理'
          }
        },
        {
          path: 'opportunity',
          name: 'opportunity',
          component: Opportunity,
          meta: {
            title: '机会管理'
          }
        },
        {
          path: 'customer',
          name: 'customer',
          component: Customer,
          meta: {
            title: '客户管理'
          }
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {
            title: '订单管理'
          }
        },

      ]
    },
    {
      path: '/largeScreen',
      alias: ['/ls', '/largescreen'],
      name: 'largeScreen',
      component: LargeScreenView,
      meta: {
        title: '大屏'
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  const currentUserString = sessionStorage.getItem('currentUser')
  // if (to.name !== 'signin' && currentUserString == null) next({ path: '/signin' })
  // else next()
  next()
  document.title = String(to.meta.title);
})

export default router
