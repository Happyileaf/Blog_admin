/* Layout */
import Layout from '@/layout'

const infoRouter = {
    path: '/info',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Info',
    meta: {
      title: '用户信息',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '用户主页', icon: 'el-icon-s-home', noCache: true }
      }
    ]
  }

  export default infoRouter