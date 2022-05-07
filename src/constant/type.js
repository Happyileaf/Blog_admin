export const ARTICLE_CATEGORY = [
  { key: 1, display_name: '前端' },
  { key: 2, display_name: '后端' },
  { key: 3, display_name: '算法' },
  { key: 4, display_name: 'Android' },
  { key: 5, display_name: 'IOS' },
  { key: 6, display_name: '随笔' }
]

export const ARTICLE_TAG = [
  { key: 1, display_name: 'HTML' },
  { key: 2, display_name: 'CSS' },
  { key: 3, display_name: 'Javascript' },
  { key: 4, display_name: 'Vue' },
  { key: 5, display_name: 'React' },
  { key: 6, display_name: 'Angular' },
  { key: 7, display_name: 'Node.js' },
  { key: 8, display_name: 'Webpack' }
]

export const ARTICLE_CATEGORY_KV = KV(ARTICLE_CATEGORY)
export const ARTICLE_CATEGORY_ARR = ARR(ARTICLE_CATEGORY)
export const ARTICLE_TAG_KV = KV(ARTICLE_TAG)
export const ARTICLE_TAG_ARR = ARR(ARTICLE_TAG)

export function KV(obj) {
  return obj.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
}

export function ARR(obj) {
  return obj.map(x => x.display_name)
}

export function fun(obj) {
  return obj.map(x => {
    return {
      'tag_id': x.key,
      'tag_name': x.display_name,
      'tag_url': 'frontend',
      'rank': x.key,
      'back_ground': 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      'post_article_count': 12896,
      'concern_user_count': 295818

    }
  })
}

console.log(fun(ARTICLE_TAG))

export const CATEGORY_LIST = [
  {
    category_id: 0,
    category_name: '前端',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 1,
    category_name: '后端',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 2,
    category_name: '算法',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 3,
    category_name: '人工智能',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 4,
    category_name: '产品',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 5,
    category_name: '设计',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 6,
    category_name: 'Android',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 7,
    category_name: 'IOS',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 8,
    category_name: '运维',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  },
  {
    category_id: 9,
    category_name: '测试',
    category_url: 'frontend',
    rank: 2,
    back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
    status: 1
  }
]

export const TAG_LIST =
  [
    {
      tag_id: 0,
      tag_name: 'HTML',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 1,
      tag_name: 'CSS',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 2,
      tag_name: 'Javascript',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 3,
      tag_name: 'Vue',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 4,
      tag_name: 'React',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 5,
      tag_name: 'Angular',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 6,
      tag_name: 'Node.js',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    },
    {
      tag_id: 7,
      tag_name: 'Webpack',
      tag_url: 'frontend',
      rank: 0,
      back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
      post_article_count: 12896,
      concern_user_count: 295818,
      status: 1
    }
  ]
