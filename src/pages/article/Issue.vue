<template>
  <div class="wrap">
    <article-detail v-if="!isEdit" :is-edit="false" />
    <article-detail v-if="isEdit" :is-edit="true" />
  </div>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'CreateArticle',
  components: { ArticleDetail },
  computed: {
    isEdit() {
      const { article_id } = this.$route.query
      return article_id !== undefined
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

