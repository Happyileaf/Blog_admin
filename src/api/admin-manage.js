/*
 * @Author: your name
 * @Date: 2022-03-03 15:46:18
 * @LastEditTime: 2022-03-05 19:52:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\admin-manage.js
 */

import request from '@/utils/request'

/**
 * @description: 获取管理员列表
 * @param {*} query
 * @return {*}
 */
export function fetchAdminList(query) {
  return request({
    url: `/vue-element-admin/Admin/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取指定管理员
 * @param {*} id
 * @return {*}
 */
export function fetchAdmin(id) {
  return request({
    url: `/vue-element-admin/Admin/detail`,
    method: `get`,
    params: { id }
  })
}

/**
 * @description: 新建管理员
 * @param {*} data
 * @return {*}
 */
export function createAdmin(data) {
  return request({
    url: `/vue-element-admin/Admin/create`,
    method: `post`,
    data
  })
}

/**
 * @description: 更新管理员
 * @param {*} data
 * @return {*}
 */
export function updateAdmin(data) {
  return request({
    url: `/vue-element-admin/Admin/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 激活或冻结管理员
 * @param {*} data
 * @return {*}
 */
export function activateOrFreezeAdmin(data) {
  return request({
    url: `/vue-element-admin/User/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 删除管理员
 * @param {*} id
 * @return {*}
 */
export function deleteAdmin(id) {
  return request({
    url: `/vue-element-admin/article/update/${id}`,
    method: `delete`
  })
}

