/*
 * @Author: your name
 * @Date: 2022-03-03 10:18:30
 * @LastEditTime: 2022-03-05 21:03:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\category.js
 */

import request from '@/utils/request'

/**
 * @description: 获取分类列表
 * @param {*} query
 * @return {*}
 */
export function fetchCategoryList(query) {
  return request({
    url: `/vue-element-admin/Category/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取指定分类
 * @param {*} id
 * @return {*}
 */
export function fetchCategory(id) {
  return request({
    url: `/vue-element-admin/Category/detail`,
    method: `get`,
    params: { id }
  })
}

/**
 * @description: 新建分类
 * @param {*} data
 * @return {*}
 */
export function createCategory(data) {
  return request({
    url: `/vue-element-admin/Category/create`,
    method: `post`,
    data
  })
}

/**
 * @description: 更新分类
 * @param {*} data
 * @return {*}
 */
export function updateCategory(data) {
  return request({
    url: `/vue-element-admin/Category/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 激活或冻结分类
 * @param {*} data
 * @return {*}
 */
export function activateOrFreezeCategory(data) {
  return request({
    url: `/vue-element-admin/Category/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 删除分类
 * @param {*} id
 * @return {*}
 */
export function deleteCategory(id) {
  return request({
    url: `/vue-element-admin/article/update/${id}`,
    method: `delete`
  })
}

