/*
 * @Author: your name
 * @Date: 2022-03-03 10:27:37
 * @LastEditTime: 2022-03-03 15:43:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\preset.js
 */

import request from '@/utils/request'

/**
 * @description: 获取网站的基本配置
 * @param {*} query
 * @return {*}
 */
export function fetchPreset(query) {
  return request({
    url: `/vue-element-admin/Tag/update`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 更新网站的基本配置
 * @param {*} data
 * @return {*}
 */
export function updatePreset(data) {
  return request({
    url: `/vue-element-admin/Tag/update`,
    method: `post`,
    data
  })
}

/**
 * @description: 获取网站的基本信息
 * @param {*} query
 * @return {*}
 */
export function fetchBasicInfo(query) {
  return request({
    url: `/vue-element-admin/Tag/update`,
    method: `get`,
    params: query
  })
}
/**
 * @description: 更新网站的基本信息
 * @param {*} data
 * @return {*}
 */
export function updateBasicInfo(data) {
  return request({
    url: `/vue-element-admin/Tag/update`,
    method: `post`,
    data
  })
}
