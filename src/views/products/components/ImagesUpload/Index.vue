<template>
  <div class="card">
    <div class="dropzone">
      <DropZone
        :enabled="!uploading"
        @filesAdded="onFilesAdded"
      />
    </div>
    <div class="left-side">
      <div class="file-list">
        <h3 style="margin-top:0; color: rgb(175, 175, 175)">
          EXTRA IMAGES
        </h3>
        <ListItem
          v-for="file in files"
          :key="file.name"
          :filename="file.name"
          :upload-state="uploadProgress[file.name] ? uploadProgress[file.name].state : 'idle'"
          :percentage="uploadProgress[file.name] ? uploadProgress[file.name].percentage : 0"
        />
      </div>
      <button
        v-if="!successfullUploaded"
        :disabled="uploading"
        @click="uploadFiles"
      >
        <i class="el-icon-upload" />
        &nbsp;
        <span>Upload</span>
      </button>
      <button
        v-if="successfullUploaded"
        @click="clearFileList"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DropZone from './DropZone.vue'
import ListItem from './ListItem.vue'

@Component({
  components: {
    DropZone,
    ListItem
  }
})
export default class ImagesUpload extends Vue {
  private files: File[] = []
  private uploadProgress: {
    [key: string]: { state: string; percentage: number }
  } = {}
  private uploading = false
  private successfullUploaded = false

  onFilesAdded(files: File[]) {
    this.files = [...files, ...this.files]
  }

  private async uploadFiles() {
    this.uploading = true
    this.uploadProgress = {}
    const promises: Promise<any>[] = []
    this.files.forEach(file => {
      promises.push(this.sendRequest(file))
    })
    try {
      await Promise.all(promises)
      this.uploading = false
      this.successfullUploaded = true
    } catch (e) {
      console.log(e)
      this.uploading = false
      // Just do this for now...
      this.successfullUploaded = true
    }
  }

  sendRequest(file: File) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()

      req.upload.addEventListener('progress', (event: ProgressEvent) => {
        if (event.lengthComputable) {
          this.uploadProgress[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100
          }
          this.uploadProgress = { ...this.uploadProgress }
        }
      })
      req.upload.addEventListener('load', (event: Event) => {
        this.uploadProgress[file.name] = { state: 'done', percentage: 100 }
        resolve(req.response)
      })
      req.upload.addEventListener('error', (event: any) => {
        this.uploadProgress[file.name] = { state: 'error', percentage: 0 }
        this.uploadProgress = { ...this.uploadProgress }
        reject(req.response)
      })

      const formData = new FormData()
      formData.append('file', file, file.name)

      req.open('POST', 'http://localhost:3000/upload')
      req.send(formData)
    })
  }

  clearFileList() {
    this.files = []
    this.successfullUploaded = false
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #eee;
  border-radius: 2px;
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  align-self: center;
}

button {
  font-family: 'Roboto medium', sans-serif;
  font-size: 14px;
  height: 36px;
  min-width: 88px;
  padding: 6px 16px;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: auto;
  user-select: none;
  border: 0;
  border-radius: 2px;
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
  outline: 0;
  align-self: flex-end;
}

button:disabled {
  background: grey;
}

.dropzone {
  width: 50%;
  float: left;
}

.file-list {
  float: left;
  padding-left: 16px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-bottom: 16px;
}

.left-side {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
