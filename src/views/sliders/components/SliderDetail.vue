<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      class="form-container"
    >
      <sticky
        :z-index="10"
        :class-name="'sub-navbar '+postForm.status"
        style="text-align: center; padding-top: 10px"
      >
        <el-button-group>
          <el-button
            v-loading="loading"
            style="margin-left: 10px;"
            type="success"
            @click="submitForm"
          >
            Save
          </el-button>
          <el-button
            v-loading="loading"
            type="warning"
            @click="draftForm"
          >
            Draft
          </el-button>
        </el-button-group>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item
              label-width="60px"
              label="Image:"
              class="postInfo-container-item"
            >
              <div class="avatar-upload">
                <div class="avatar-edit">
                  <input
                    ref="fileUpload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    @change="uploadImage"
                  >
                  <label
                    for="imageUpload"
                    @click="uploadImage"
                  >
                    <i class="el-icon-edit" />
                  </label>
                </div>
                <div class="avatar-preview">
                  <img
                    v-show="dataImage !== ''"
                    :src="dataImage"
                  >
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label-width="60px"
              label="Active:"
              class="postInfo-container-item"
            >
              <el-radio-group v-model="postForm.isActive">
                <el-radio :label="true">
                  True
                </el-radio>
                <el-radio :label="false">
                  False
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import MDinput from '@/components/MDinput/index.vue'
import Sticky from '@/components/Sticky/index.vue' // 粘性header组件
import { SliderApi } from '@/api'
import slug from 'slug'
import Warning from './Warning.vue'
@Component({
  components: {
    MDinput,
    Sticky,
    Warning
  }
})
export default class SliderDetail extends Vue {
  @Prop({ default: false }) private isEdit!: boolean
  private defaultForm = {
    id: undefined,
    url: '',
    status: 'draft',
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  private dataImage: string = ''

  private postForm: any = this.defaultForm
  private loading: boolean = false
  private tempRoute: object = {}

  get lang() {
    return this.$store.getters.language
  }

  private created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(Number(id))
    } else {
      this.setTagsViewTitle()
      this.setPageTitle()
      this.postForm = Object.assign({}, this.defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    const slider = await new SliderApi().show(id)
    this.postForm = slider
    this.dataImage = this.postForm.url
    this.setTagsViewTitle()
    this.setPageTitle()
  }
  private setTagsViewTitle() {
    const title = this.lang === 'vi' ? 'Sửa slider' : 'Edit Slider'
    const route = Object.assign({}, this.tempRoute, {
      title: `${title}-${this.postForm.id}`
    })
    this.$store.commit('UPDATE_VISITED_VIEW', route)
  }
  private setPageTitle() {
    const title = 'Edit Slider'
    document.title = `${title} - ${this.postForm.id}`
  }
  private async submitForm() {
    const valid = await (this as any).$validator.validate()
    if (!valid) {
      return this.$message({
        message: 'Please fill all fields',
        type: 'warning'
      })
    }
    if (!this.isEdit) {
      delete this.postForm.id
      this.postForm.createdAt = new Date()
      this.postForm.updatedAt = new Date()
    }
    const formData = new FormData()
    formData.append('slider', JSON.stringify(this.postForm))
    if (typeof this.postForm.image === 'object') {
      formData.append('image', this.postForm.image)
    }
    const res = this.isEdit
      ? await new SliderApi().update(formData)
      : await new SliderApi().create(formData)
    this.loading = true
    this.$notify({
      title: 'Success',
      message: 'Slider save successfully!',
      type: 'success',
      duration: 2000
    })
    this.postForm.status = 'published'
    this.loading = false
  }
  private draftForm() {
    if (this.postForm.content.length === 0 || this.postForm.name.length === 0) {
      this.$message({
        message: 'Please fill all fields',
        type: 'warning'
      })
      return
    }
    this.$message({
      message: 'Draft save successfully!',
      type: 'success',
      showClose: true,
      duration: 1000
    })
    this.postForm.status = 'draft'
  }

  private uploadImage() {
    const input = (this as any).$refs.fileUpload
    input.click()
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      this.postForm.image = input.files[0]
      const vm = this
      reader.onload = function(e: any) {
        vm.dataImage = e.target.result
      }
      reader.readAsDataURL(input.files[0])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.avatar-upload {
  position: relative;
  max-width: 205px;
  .avatar-edit {
    position: absolute;
    right: 40px;
    z-index: 1;
    top: 10px;
    input {
      display: none;
      + label {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-bottom: 0;
        border-radius: 100%;
        font-size: 20px;
        text-align: center;
        background: #ffffff;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: #f1f1f1;
          border-color: #d6d6d6;
        }
      }
    }
  }
  .avatar-preview {
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 100%;
    border: 6px solid #f8f8f8;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    > img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
