/*
 * @Author: your name
 * @Date: 2022-03-03 10:27:37
 * @LastEditTime: 2022-03-25 15:48:44
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
export function fetchCarouselImgList(query) {
  return request({
    url: `/blogServer/preset/fetchPictureList`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 更新网站的基本配置
 * @param {*} data
 * @return {*}
 */
export function createCarouselImg(data) {
  return request({
    url: `/blogServer/preset/createPicture`,
    method: `post`,
    data
  })
}

/**
 * @description: 获取网站的基本信息
 * @param {*} query
 * @return {*}
 */
export function deleteCarouselImg(picture_id) {
  return request({
    url: `/blogServer/preset/deletePicture/${picture_id}`,
    method: `delete`,
  })
}

/**
 * @description: 获取网站的基本配置
 * @param {*} query
 * @return {*}
 */
 export function fetchRecommendationNavList(query) {
  return request({
    url: `/blogServer/preset/fetchNavList`,
    method: `get`,
    params: query
  })
}

/**
 * @description: 更新网站的基本配置
 * @param {*} data
 * @return {*}
 */
export function createRecommendationNav(data) {
  return request({
    url: `/blogServer/preset/createNav`,
    method: `post`,
    data
  })
}

/**
 * @description: 获取网站的基本信息
 * @param {*} query
 * @return {*}
 */
export function deleteRecommendationNav(nav_id) {
  return request({
    url: `/blogServer/preset/deleteNav/${nav_id}`,
    method: `delete`,
  })
}