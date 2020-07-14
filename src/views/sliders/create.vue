<template>
  <slider-detail :is-edit="false" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import SliderDetail from './components/SliderDetail'

@Component({
  components: {
    SliderDetail
  }
})
export default class CreateForm extends Vue {}
</script>
