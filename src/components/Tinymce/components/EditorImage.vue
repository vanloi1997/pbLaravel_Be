<template>
  <div class="upload-container">
    <el-button
      :style="{background: color,borderColor: color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >upload</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="defaultFileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :headers="headers"
        name="image"
        :data="{uid}"
        action="https://api.duckhiemsolarvungtau.com/product-images/temporaries"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">Click upload</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit">Confirm</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ElUploadInternalRawFile } from 'element-ui/types/upload'
import { UserModule } from '@/store/modules/user'
import { ProductImageApi } from '@/api'

export interface IUploadObject {
  hasSuccess: boolean
  uid: number
  url: string
  width: number
  height: number
}

export interface IElUploadInternalBackend extends ElUploadInternalRawFile {
  id: Number
  response: any
}

@Component
export default class EditorImageUpload extends Vue {
  @Prop({ default: '#1890ff' }) private color!: string

  private dialogVisible = false
  private listObj: IUploadObject[] = []
  private defaultFileList = []
  private headers = {
    Authorization: UserModule.token,
  }
  private uid: number = 0

  @Watch('listObj')
  onPropertyChanged() {
    this.uid = this.genuid()
  }

  private genuid() {
    let next = 0
    if (this.listObj.length > 0) {
      const max = Math.max.apply(
        Math,
        this.listObj.map(x => Number(x.uid))
      )
      next = max + 1
    }
    return next
  }

  private checkAllSuccess() {
    return this.listObj.every(item => this.listObj[item.uid].hasSuccess)
  }

  private handleSubmit() {
    const arr = this.listObj.map(v => this.listObj[v.uid])
    if (!this.checkAllSuccess()) {
      this.$message(
        'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
      )
      return
    }
    this.$emit('successCBK', arr)
    this.listObj = []
    this.defaultFileList = []
    this.dialogVisible = false
  }

  private handleSuccess(response: any, file: IElUploadInternalBackend) {
    const uid = response.uid
    this.listObj[uid].url = response.url
    this.listObj[uid].hasSuccess = true
  }

  private async handleRemove(file: IElUploadInternalBackend) {
    const uid = file.response.id
    const id = file.response.savedName
    const res = await new ProductImageApi().deleteTempoary(id)
    if (!res.success) {
      this.$message(res.message)
      return
    }
    this.listObj.splice(uid, 1)
  }

  private beforeUpload(file: IElUploadInternalBackend) {
    const fileName = this.uid
    const img = new Image()
    img.src = window.URL.createObjectURL(file)
    img.onload = () => {
      this.$set(this.listObj, fileName, {
        hasSuccess: false,
        uid: fileName,
        url: '',
        width: img.width,
        height: img.height,
      })
    }
  }
}
</script>

<style lang="scss">
.editor-slide-upload {
  .el-upload--picture-card {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
}
</style>
