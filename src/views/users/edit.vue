<template>
  <user-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import UserDetail from './components/UserDetail'

@Component({
  components: {
    UserDetail
  }
})
export default class EditForm extends Vue {}
</script>
