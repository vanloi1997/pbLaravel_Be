<template>
  <product-type-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProductTypeDetail from './components/ProductTypeDetail'

@Component({
  components: {
    ProductTypeDetail
  }
})
export default class CreateForm extends Vue {}
</script>
