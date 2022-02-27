/* Layout */
import Layout from '@/layout'

const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Setting',
    meta: {
      title: '网站设置',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'KeyboardChart',
        meta: { title: '基础设置', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line'),
        name: 'LineChart',
        meta: { title: '基本信息', noCache: true }
      }
    ]
  }

  export default settingRouter