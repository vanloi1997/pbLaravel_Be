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
          <el-col :span="10">
            <el-form-item
              style="margin-bottom: 40px;"
              label="User"
              label-width="80px"
            >
              <el-select
                v-model="postForm.user.id"
                v-validate="'required'"
                :remote-method="getRemoteUserList"
                placeholder="Pick a user"
                filterable
                default-first-option
                remote
                name="user"
              >
                <el-option
                  v-for="(item,index) in userOptions"
                  :key="item+index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <p>
                <el-tag
                  v-show="errors.has('user')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('user') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="4">
&nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item
              style="margin-bottom: 40px;"
              label="Bill State"
            >
              <el-select
                v-model="postForm.billState.id"
                v-validate="'required'"
                :remote-method="getRemoteBillStateList"
                placeholder="Pick a state"
                filterable
                default-first-option
                remote
                name="billState"
              >
                <el-option
                  v-for="(item,index) in billStateOptions"
                  :key="item+index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <p>
                <el-tag
                  v-show="errors.has('billState')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('billState') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.totalAmount"
                v-validate="'required|numeric|min_value:0'"
                placeholder="23000000"
                name="totalAmount"
              >
                Total Amount
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('totalAmount')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('totalAmount') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="4">
&nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.description"
                placeholder="Phonenum: 00008888, Address: aaabbbccc"
              >
                Description
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label-width="70px"
              label="Active"
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
import { BillApi, BillStateApi, UserApi } from '@/api'
import Warning from './Warning.vue'
@Component({
  components: {
    MDinput,
    Sticky,
    Warning
  }
})
export default class BillDetail extends Vue {
  @Prop({ default: false }) private isEdit!: boolean
  private defaultForm = {
    id: undefined,
    status: 'draft',
    user: {
      id: undefined
    },
    billState: {
      id: undefined
    },
    totalAmount: '0',
    description: '',
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  private postForm: any = this.defaultForm
  private loading: boolean = false
  private tempRoute: object = {}
  private userOptions: [] = []
  private billStateOptions: [] = []

  private async getRemoteBillStateList() {
    const res = await new BillStateApi().index()
    this.billStateOptions = res.items
  }

  private async getRemoteUserList() {
    const res = await new UserApi().index()
    this.userOptions = res.items
  }

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
    const bill = await new BillApi().show(id)
    const users = await new UserApi().index()
    const billStates = await new BillStateApi().index()
    this.userOptions = users.items
    this.billStateOptions = billStates.items
    this.postForm = bill
    this.setTagsViewTitle()
    this.setPageTitle()
  }
  private setTagsViewTitle() {
    const title = this.lang === 'vi' ? 'Sửa hóa đơn' : 'Edit Bill'
    const route = Object.assign({}, this.tempRoute, {
      title: `${title}-${this.postForm.id}`
    })
    this.$store.commit('UPDATE_VISITED_VIEW', route)
  }
  private setPageTitle() {
    const title = 'Edit Bill'
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
      this.postForm.createdAt = '2019-05-30 02:55:17'
      this.postForm.updatedAt = '2019-05-30 02:55:17'
    }
    const res = this.isEdit
      ? await new BillApi().update(this.postForm)
      : await new BillApi().create(this.postForm)
    this.loading = true
    this.$notify({
      title: 'Success',
      message: 'Bill save successfully!',
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
</style>
