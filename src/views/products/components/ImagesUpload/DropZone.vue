<template>
  <div
    class="dropzone"
    :class="{hightlight: hightlight, disabled: !enabled}"
    @click="openFileSelection"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <div class="text-muted">
      Drop or Select
    </div>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      multiple
      @change="onFileChanged"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class DropZone extends Vue {
  @Prop({ default: true }) private enabled!: boolean
  private hightlight: boolean = false

  private openFileSelection(): void {
    if (!this.enabled) {
      return
    }
    ;(this as any).$refs.fileInput.click()
  }

  private onDragOver(event: any): void {
    event.preventDefault()
    if (!this.enabled) {
      return
    }
    this.hightlight = true
  }

  private onDragLeave(event: DragEvent): void {
    this.hightlight = false
  }

  private onFileChanged(event: any) {
    let result: File[] = []
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        result.push(event.target.files.item(i))
      }
    }
    this.$emit('filesAdded', result)
  }

  private onDrop(event: any): void {
    event.preventDefault()
    if (!this.enabled) {
      return
    }
    const files = event.dataTransfer.files
    let result: File[] = []
    for (let i = 0; i < files.length; i++) {
      result.push(files.item(i) as File)
    }
    this.$emit('filesAdded', result)
    this.hightlight = false
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  position: relative;
  border: 3px dashed #eee;
  color: #eee;
  font: bold 24px/200px arial;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;

  .file-input {
    display: none;
  }

  .text-muted {
    color: #eee;
  }
}

.hightlight {
  background-color: #b3dbc9;
}

.disabled {
  border: 3px dashed grey;
  color: grey;
}
</style>
