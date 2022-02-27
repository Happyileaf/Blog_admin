/* Layout */
import Layout from '@/layout'

const categoryRouter = {
    path: '/category',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Category',
    meta: {
      title: '类型管理',
      icon: 'el-icon-s-data'
    },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'KeyboardChart',
        meta: { title: '分类管理', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line'),
        name: 'LineChart',
        meta: { title: '标签管理', noCache: true }
      },
    ]
  }

  export default categoryRouter