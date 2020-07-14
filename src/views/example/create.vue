<template>
  <article-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ArticleDetail from './components/ArticleDetail'

@Component({
  components: {
    ArticleDetail
  }
})
export default class CreateForm extends Vue {}
</script>
