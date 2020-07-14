<template>
  <provider-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProviderDetail from './components/ProviderDetail'

@Component({
  components: {
    ProviderDetail
  }
})
export default class CreateForm extends Vue {}
</script>
