/*
 * @Author: your name
 * @Date: 2022-03-27 17:46:52
 * @LastEditTime: 2022-03-27 17:48:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\api\userInfo.js
 */

import request from '@/utils/request'

/**
 * @description: 获取指定用户
 * @param {*} id
 * @return {*}
 */
export function fetchUserInfo(id) {
  return request({
    url: `/blogServer/userInfo/fetchUserInfo`,
    method: `get`,
    params: { id }
  })
}

/**
 * @description: 更新用户
 * @param {*} data
 * @return {*}
 */
export function updateUserInfo(data) {
  return request({
    url: `/blogServer/userInfo/update`,
    method: `post`,
    data
  })
}
