import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
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

