/* Layout */
import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Article',
  meta: {
    title: '文章管理',
    icon: 'el-icon-tickets'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: '发布', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: '文章列表', noCache: true }
    },
  ]
}

export default articleRouter