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
              label="Product"
              label-width="80px"
            >
              <el-select
                v-model="postForm.product.id"
                v-validate="'required'"
                :remote-method="getRemoteProductList"
                placeholder="Pick a product"
                filterable
                default-first-option
                remote
                name="product"
                @change="updatePrice"
              >
                <el-option
                  v-for="(item,index) in productOptions"
                  :key="item+index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <p>
                <el-tag
                  v-show="errors.has('product')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('product') }}
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
              label="Bill"
              label-width="80px"
            >
              <el-select
                v-model="postForm.bill.id"
                v-validate="'required'"
                :remote-method="getRemoteBillList"
                placeholder="Pick a bill"
                filterable
                default-first-option
                remote
                name="bill"
              >
                <el-option
                  v-for="(item,index) in billOptions"
                  :key="item+index"
                  :label="item.id"
                  :value="item.id"
                />
              </el-select>
              <p>
                <el-tag
                  v-show="errors.has('bill')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('bill') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.price"
                v-validate="'required|numeric|min_value:0'"
                placeholder="23000000"
                name="price"
              >
                Price
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('price')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('price') }}
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
                v-model="postForm.quantity"
                v-validate="'required|numeric|min_value:0'"
                placeholder="23000000"
                name="quantity"
              >
                Quantity
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('quantity')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('quantity') }}
                </el-tag>
              </p>
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
import { BillDetailApi, BillApi, ProductApi } from '@/api'
import slug from 'slug'
import Warning from './Warning.vue'
@Component({
  components: {
    MDinput,
    Sticky,
    Warning
  }
})
export default class BillDetailItem extends Vue {
  @Prop({ default: false }) private isEdit!: boolean
  private defaultForm = {
    id: undefined,
    product: { id: undefined },
    bill: { id: undefined },
    price: '0',
    quantity: '1',
    status: 'draft',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  private postForm: any = this.defaultForm
  private loading: boolean = false
  private tempRoute: object = {}
  private productOptions: [] = []
  private billOptions: [] = []

  get lang() {
    return this.$store.getters.language
  }

  private updatePrice() {
    const id = this.postForm.product.id
    const product: any = this.productOptions.filter(
      (item: any) => item.id === id
    )
    this.postForm.price = product[0].price
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
    const billDetail = await new BillDetailApi().show(id)
    await this.getRemoteBillList()
    await this.getRemoteProductList()
    this.postForm = billDetail
    this.setTagsViewTitle()
    this.setPageTitle()
  }

  private setTagsViewTitle() {
    const title =
      this.lang === 'vi' ? 'Sửa chi tiết hóa đơn' : 'Edit Bill Detail'
    const route = Object.assign({}, this.tempRoute, {
      title: `${title}-${this.postForm.id}`
    })
    this.$store.commit('UPDATE_VISITED_VIEW', route)
  }

  private setPageTitle() {
    const title = 'Edit Bill Detail'
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
      ? await new BillDetailApi().update(this.postForm)
      : await new BillDetailApi().create(this.postForm)
    this.loading = true
    this.$notify({
      title: 'Success',
      message: 'Bill Detail save successfully!',
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

  private async getRemoteBillList() {
    const res = await new BillApi().index()
    this.billOptions = res.items
  }

  private async getRemoteProductList() {
    const res = await new ProductApi().index()
    this.productOptions = res.items
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
