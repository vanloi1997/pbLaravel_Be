<template>
  <el-dropdown
    :show-timeout="100"
    trigger="click"
  >
    <el-button plain>
      Link
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu
      slot="dropdown"
      class="no-padding no-border"
      style="width:400px"
    >
      <el-form-item
        label-width="0px"
        style="margin-bottom: 0px"
        prop="sourceUri"
      >
        <el-input
          v-model="sourceUri"
          placeholder="Please enter the content"
        >
          <template slot="prepend">
            URL
          </template>
        </el-input>
      </el-form-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SourceUrl extends Vue {
  @Prop({ default: '' }) private value!: string;
  get sourceUri() {
    return this.value
  }

  set sourceUri(val) {
    this.$emit('input', val)
  }
}
</script>
