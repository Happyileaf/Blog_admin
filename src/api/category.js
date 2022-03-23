/*
 * @Author: your name
 * @Date: 2022-03-03 10:18:30
 * @LastEditTime: 2022-03-22 17:34:09
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
    url: `/blogServer/category/fetchList`,
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
    url: `/blogServer/category/fetchCategory`,
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
    url: `/blogServer/category/create`,
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
    url: `/blogServer/category/update`,
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
    url: `/blogServer/category/activateOrFreeze`,
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
    url: `/blogServer/category/delete/${id}`,
    method: `delete`
  })
}

