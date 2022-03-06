/*
 * @Author: your name
 * @Date: 2022-02-27 17:55:46
 * @LastEditTime: 2022-03-06 19:27:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\router\preset\preset.js
 */
/* Layout */
import Layout from '@/layout'

const presetRouter = {
  path: '/preset',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Preset',
  meta: {
    title: '网站设置',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'infrastructure',
      component: () => import('@/pages/preset/Infrastructure'),
      name: 'Infrastructure',
      meta: { title: '基础设置', noCache: true }
    },
    {
      path: 'basicInformation',
      component: () => import('@/pages/preset/BasicInformation'),
      name: 'BasicInformation',
      meta: { title: '基本信息（预留）', noCache: true }
    }
  ]
}

export default presetRouter
