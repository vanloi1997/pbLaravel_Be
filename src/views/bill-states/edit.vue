<template>
  <bill-state-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillStateDetail from './components/BillStateDetail'

@Component({
  components: {
    BillStateDetail
  }
})
export default class EditForm extends Vue {}
</script>
