<template>
  <category-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/CategoryDetail'

@Component({
  components: {
    CategoryDetail
  }
})
export default class CreateForm extends Vue {}
</script>
