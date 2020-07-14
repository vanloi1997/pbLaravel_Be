<template>
  <provider-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProviderDetail from './components/ProviderDetail'

@Component({
  components: {
    ProviderDetail
  }
})
export default class EditForm extends Vue {}
</script>
