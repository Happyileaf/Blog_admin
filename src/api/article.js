import request from '@/utils/request'

// 获取文章列表
export function fetchList(query) {
  return request({
    url: `/vue-element-admin/article/list`,
    method: `get`,
    params: query
  })
}

// 获取特定文章
export function fetchArticle(id) {
  return request({
    url: `/vue-element-admin/article/detail`,
    method: `get`,
    params: { id }
  })
}

// 新建文章
export function createArticle(data) {
  return request({
    url: `/vue-element-admin/article/create`,
    method: `post`,
    data
  })
}



// 更新文章
export function updateArticle(data) {
  return request({
    url: `/vue-element-admin/article/update`,
    method: `post`,
    data
  })
}

// 发布或草稿文章
export function publishOrDraftArticle(data) {
  return request({
    url: `/vue-element-admin/article/update`,
    method: `post`,
    data
  })
}



//删除文章
export function deleteArticle(id) {
  return request({
    url: `/vue-element-admin/article/update/${id}`,
    method: `delete`,
  })
}
