<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky
        :z-index="10"
        :class-name="'sub-navbar '+postForm.status"
      >
        <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >
          Publush
        </el-button>
        <el-button
          v-loading="loading"
          type="warning"
          @click="draftForm"
        >
          Draft
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item
              style="margin-bottom: 40px;"
              prop="title"
            >
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                Title
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label-width="60px"
                    label="Author:"
                    class="postInfo-container-item"
                  >
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteUserList"
                      filterable
                      default-first-option
                      remote
                      placeholder="Search user"
                    >
                      <el-option
                        v-for="(item,index) in userListOptions"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label-width="120px"
                    label="Publush Time:"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="displayTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="Select date and time"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="90px"
                    label="Importance:"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item
          style="margin-bottom: 40px;"
          label-width="70px"
          label="Summary:"
        >
          <el-input
            v-model="postForm.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span
            v-show="contentShortLength"
            class="word-counter"
          >{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item
          prop="content"
          style="margin-bottom: 30px;"
        >
          <Tinymce
            ref="editor"
            v-model="postForm.content"
            :height="400"
          />
        </el-form-item>

        <el-form-item
          prop="image_uri"
          style="margin-bottom: 30px;"
        >
          <Upload v-model="postForm.image_uri" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'
import Upload from '@/components/Upload/SingleImage3.vue'
import MDinput from '@/components/MDinput/index.vue'
import Sticky from '@/components/Sticky/index.vue' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning.vue'
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown
} from './Dropdown'

@Component({
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  }
})
export default class ArticleDetail extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0
  };
  private postForm: any = this.defaultForm;
  private loading: boolean = false;
  private userListOptions: [] = [];
  private tempRoute: object = {};

  private validateRequire = (
    rule: any,
    value: string,
    callback: CallableFunction
  ) => {
    if (value === '') {
      this.$message({
        message: rule.field + '为必传项',
        type: 'error'
      })
      callback(new Error(rule.field + '为必传项'))
    } else {
      callback()
    }
  };

  private validateSourceUri = (
    rule: any,
    value: string,
    callback: CallableFunction
  ) => {
    if (value) {
      if (validURL(value)) {
        callback()
      } else {
        this.$message({
          message: '外链url填写不正确',
          type: 'error'
        })
        callback(new Error('外链url填写不正确'))
      }
    } else {
      callback()
    }
  };
  private rules: object = {
    image_uri: [
      {
        validator: this.validateRequire
      }
    ],
    title: [
      {
        validator: this.validateRequire
      }
    ],
    content: [
      {
        validator: this.validateRequire
      }
    ],
    source_uri: [
      {
        validator: this.validateSourceUri,
        trigger: 'blur'
      }
    ]
  };

  get displayTime() {
    return +new Date(this.postForm.display_time)
  }
  set displayTime(val: any) {
    this.postForm.display_time = new Date(val)
  }

  get lang() {
    return this.$store.getters.language
  }
  get contentShortLength() {
    return this.postForm.content_short.length
  }

  private created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, this.defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  }

  private fetchData(id: string) {
    fetchArticle(id)
      .then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      })
      .catch(err => {
        console.log(err)
      })
  }
  private setTagsViewTitle() {
    const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
    const route = Object.assign({}, this.tempRoute, {
      title: `${title}-${this.postForm.id}`
    })
    this.$store.commit('UPDATE_VISITED_VIEW', route)
  }
  private setPageTitle() {
    const title = 'Edit Article'
    document.title = `${title} - ${this.postForm.id}`
  }
  private submitForm() {
    console.log(this.postForm);
    (this as any).$refs.postForm.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        this.$notify({
          title: '成功',
          message: '发布文章成功',
          type: 'success',
          duration: 2000
        })
        this.postForm.status = 'published'
        this.loading = false
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  private draftForm() {
    if (
      this.postForm.content.length === 0 ||
      this.postForm.title.length === 0
    ) {
      this.$message({
        message: '请填写必要的标题和内容',
        type: 'warning'
      })
      return
    }
    this.$message({
      message: '保存成功',
      type: 'success',
      showClose: true,
      duration: 1000
    })
    this.postForm.status = 'draft'
  }
  private getRemoteUserList(query: string) {
    searchUser(query).then(response => {
      if (!response.data.items) return
      this.userListOptions = response.data.items.map((v: any) => v.name)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
</style>
