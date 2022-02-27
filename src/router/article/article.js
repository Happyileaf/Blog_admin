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
      path: 'issue',
      component: () => import('@/pages/article/Issue'),
      name: 'Issue',
      meta: { title: '发布', noCache: true }
    },
    {
      path: 'articleList',
      component: () => import('@/pages/article/ArticleList'),
      name: 'ArticleList',
      meta: { title: '文章列表', noCache: true }
    },
  ]
}

export default articleRouter