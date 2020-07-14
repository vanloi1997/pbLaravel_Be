<template>
  <bill-detail-item :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillDetailItem from './components/BillDetailItem'

@Component({
  components: {
    BillDetailItem
  }
})
export default class CreateForm extends Vue {}
</script>
