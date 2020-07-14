<template>
  <product-type-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProductTypeDetail from './components/ProductTypeDetail'

@Component({
  components: {
    ProductTypeDetail
  }
})
export default class EditForm extends Vue {}
</script>
