<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'CreateArticle',
  components: { ArticleDetail },
  mounted(){
      console.log(this.$route)
  }
}
</script>

