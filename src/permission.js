/*
 * @Author: your name
 * @Date: 2022-03-20 15:14:17
 * @LastEditTime: 2022-05-08 21:06:48
 * @LastEditors: happy 997401767@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 修改标记：移除前置导航守卫中的逻辑，直接释放next钩子

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  next()
  console.log('enter')
  console.log(from.path)
  console.log(to.path)

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.error('入口 1')
    if (to.path === '/login') {
      console.warn('分支 1')
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      console.warn('分支 2')
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        console.warn('分支 3')
        next()
      } else {
        
        try {
          console.warn('分支 4')
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const roles = store.getters.roles

          // generate accessible routes map based on rolesS
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.warn('分支 5')
          // remove token and go to login page to re-login
          console.log('has no roles')
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    console.error('入口 2')
    /* has no token*/
    console.log('has no token')

    if (whiteList.indexOf(to.path) !== -1) {
      console.warn('分支 6')
      // in the free login whitelist, go directly
      next()
    } else {
      console.warn('分支 7')
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
