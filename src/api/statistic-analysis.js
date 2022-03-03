/*
 * @Author: your name
 * @Date: 2022-03-03 16:17:55
 * @LastEditTime: 2022-03-03 16:23:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\statistic-analysis.js
 */

import request from '@/utils/request'

/**
 * @description: 获取分类统计
 * @param {*} query
 * @return {*}
 */
export function fetchStatistic_Category(query) {
  return request({
    url: `/vue-element-admin/Category/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取标签统计
 * @param {*} query
 * @return {*}
 */
export function fetchStatistic_Tag(query) {
  return request({
    url: `/vue-element-admin/Category/detail`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 获取发布时间统计
 * @param {*} query
 * @return {*}
 */
export function fetchStatistic_CreateTime(query) {
  return request({
    url: `/vue-element-admin/Category/detail`,
    method: `get`,
    params: query
  })
}

