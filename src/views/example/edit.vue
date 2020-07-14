<template>
  <article-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ArticleDetail from './components/ArticleDetail'

@Component({
  components: {
    ArticleDetail
  }
})
export default class EditForm extends Vue {}
</script>
