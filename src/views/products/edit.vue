<template>
  <product-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProductDetail from './components/ProductDetail'

@Component({
  components: {
    ProductDetail
  }
})
export default class EditForm extends Vue {}
</script>
