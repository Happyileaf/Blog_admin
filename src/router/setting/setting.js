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
        path: 'infrastructure',
        component: () => import('@/pages/setting/Infrastructure'),
        name: 'Infrastructure',
        meta: { title: '基础设置', noCache: true }
      },
      {
        path: 'basicInformation',
        component: () => import('@/pages/setting/BasicInformation'),
        name: 'BasicInformation',
        meta: { title: '基本信息', noCache: true }
      }
    ]
  }

  export default settingRouter