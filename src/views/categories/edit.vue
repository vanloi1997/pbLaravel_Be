<template>
  <category-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/CategoryDetail'

@Component({
  components: {
    CategoryDetail
  }
})
export default class EditForm extends Vue {}
</script>
