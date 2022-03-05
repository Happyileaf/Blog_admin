/*
 * @Author: your name
 * @Date: 2022-03-03 10:18:36
 * @LastEditTime: 2022-03-05 21:04:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\tag.js
 */

import request from '@/utils/request'

/**
 * @description: 获取标签列表
 * @param {*} query
 * @return {*}
 */
export function fetchTagList(query) {
  return request({
    url: `/vue-element-admin/Tag/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取指定标签
 * @param {*} id
 * @return {*}
 */
export function fetchTag(id) {
  return request({
    url: `/vue-element-admin/Tag/detail`,
    method: `get`,
    params: { id }
  })
}

/**
 * @description: 新建标签
 * @param {*} data
 * @return {*}
 */
export function createTag(data) {
  return request({
    url: `/vue-element-admin/Tag/create`,
    method: `post`,
    data
  })
}

/**
 * @description: 更新标签
 * @param {*} data
 * @return {*}
 */
export function updateTag(data) {
  return request({
    url: `/vue-element-admin/Tag/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 激活或冻结标签
 * @param {*} data
 * @return {*}
 */
export function activateOrFreezeTag(data) {
  return request({
    url: `/vue-element-admin/Category/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 删除标签
 * @param {*} id
 * @return {*}
 */
export function deleteTag(id) {
  return request({
    url: `/vue-element-admin/article/update/${id}`,
    method: `delete`
  })
}

