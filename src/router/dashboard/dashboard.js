/*
 * @Author: your name
 * @Date: 2022-03-06 16:25:18
 * @LastEditTime: 2022-04-07 21:47:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\router\dashboard\dashboard.js
 */
/* Layout */
import Layout from '@/layout'

const dashboardRouter = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/dashboard',
  name: 'dashboard',
  meta: {
    title: '用户信息',
    icon: 'guide'
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/pages/info/Info'),
      name: 'KeyboardChart',
      meta: { title: '用户信息', icon: 'guide', noCache: true, affix: true }
    }
  ]
}

export default dashboardRouter
