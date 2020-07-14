<template>
  <user-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import UserDetail from './components/UserDetail'

@Component({
  components: {
    UserDetail
  }
})
export default class CreateForm extends Vue {}
</script>
