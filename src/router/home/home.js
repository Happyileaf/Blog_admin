/* Layout */
import Layout from '@/layout'

const homeRouter = {
    path: '/home',
    component: Layout,
    redirect: '/home/dashboard',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'guide'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'KeyboardChart',
        meta: { title: '统计数据', icon: 'guide', noCache: true , affix: true }
      },
    ]
  }

  export default homeRouter