/* Layout */
import Layout from '@/layout'

export const userRouter = {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'KeyboardChart',
        meta: { title: '普通用户', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line'),
        name: 'LineChart',
        meta: { title: '管理员', noCache: true },
      },
    ]
  }

  export default userRouter