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
        path: 'category',
        component: () => import('@/pages/type/Category'),
        name: 'Category',
        meta: { title: '分类管理', noCache: true }
      },
      {
        path: 'tag',
        component: () => import('@/pages/type/Tag'),
        name: 'Tag',
        meta: { title: '标签管理', noCache: true }
      },
    ]
  }

  export default categoryRouter