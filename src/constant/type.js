export const ARTICLE_CATEGORY = [
    { key: 0, display_name: '前端' },
    { key: 1, display_name: '后端' },
    { key: 2, display_name: '算法' },
    { key: 3, display_name: '人工智能' },
    { key: 4, display_name: '产品' },
    { key: 5, display_name: '设计' },
    { key: 6, display_name: 'Android' },
    { key: 7, display_name: 'IOS' },
    { key: 8, display_name: '运维' },
    { key: 9, display_name: '测试' }
]

export const ARTICLE_TAG = [
    { key: 0, display_name: 'HTML' },
    { key: 1, display_name: 'CSS' },
    { key: 2, display_name: 'Javascript' },
    { key: 3, display_name: 'Vue' },
    { key: 4, display_name: 'React' },
    { key: 5, display_name: 'Angular' },
    { key: 6, display_name: 'Node.js' },
    { key: 7, display_name: 'Webpack' }
]

export const ARTICLE_CATEGORY_KV = KV(ARTICLE_CATEGORY)
export const ARTICLE_TAG_KV = KV(ARTICLE_TAG)

function KV(obj) {
    return obj.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name
        return acc
    }, {})
}