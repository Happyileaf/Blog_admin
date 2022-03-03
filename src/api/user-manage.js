/*
 * @Author: your name
 * @Date: 2022-03-03 15:46:18
 * @LastEditTime: 2022-03-03 15:53:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\user-manage.js
 */

import request from '@/utils/request'

/**
 * @description: 获取用户列表
 * @param {*} query
 * @return {*}
 */
export function fetchUserList(query) {
  return request({
    url: `/vue-element-admin/User/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取指定用户
 * @param {*} id
 * @return {*}
 */
export function fetchUser(id) {
  return request({
    url: `/vue-element-admin/User/detail`,
    method: `get`,
    params: { id }
  })
}

/**
 * @description: 新建用户
 * @param {*} data
 * @return {*}
 */
export function createUser(data) {
  return request({
    url: `/vue-element-admin/User/create`,
    method: `post`,
    data
  })
}

/**
 * @description: 更新用户
 * @param {*} data
 * @return {*}
 */
export function updateUser(data) {
  return request({
    url: `/vue-element-admin/User/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 删除用户
 * @param {*} id
 * @return {*}
 */
export function deleteUser(id) {
  return request({
    url: `/vue-element-admin/article/update/${id}`,
    method: `delete`
  })
}

