<template>
  <bill-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillDetail from './components/BillDetail'

@Component({
  components: {
    BillDetail
  }
})
export default class CreateForm extends Vue {}
</script>
