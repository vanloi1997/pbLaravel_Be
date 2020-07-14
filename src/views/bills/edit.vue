<template>
  <bill-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillDetail from './components/BillDetail'

@Component({
  components: {
    BillDetail
  }
})
export default class EditForm extends Vue {}
</script>
