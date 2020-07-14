<template>
  <bill-detail-item :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillDetailItem from './components/BillDetailItem'

@Component({
  components: {
    BillDetailItem
  }
})
export default class EditForm extends Vue {}
</script>
