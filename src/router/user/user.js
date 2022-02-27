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
        path: 'user',
        component: () => import('@/pages/user/User'),
        name: 'User',
        meta: { title: '普通用户', noCache: true }
      },
      {
        path: 'administrator',
        component: () => import('@/pages/user/Administrator'),
        name: 'Administrator',
        meta: { title: '管理员', noCache: true },
      },
    ]
  }

  export default userRouter