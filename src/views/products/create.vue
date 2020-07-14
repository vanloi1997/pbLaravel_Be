<template>
  <product-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProductDetail from './components/ProductDetail'

@Component({
  components: {
    ProductDetail
  }
})
export default class CreateForm extends Vue {}
</script>
