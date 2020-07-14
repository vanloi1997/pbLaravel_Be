<template>
  <bill-state-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BillStateDetail from './components/BillStateDetail'

@Component({
  components: {
    BillStateDetail
  }
})
export default class CreateForm extends Vue {}
</script>
