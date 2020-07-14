<template>
  <slider-detail :is-edit="true" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import SliderDetail from './components/SliderDetail'

@Component({
  components: {
    SliderDetail
  }
})
export default class EditForm extends Vue {}
</script>
