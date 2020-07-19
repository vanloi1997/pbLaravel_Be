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
            <el-form-item style="margin-bottom: 40px;">
              <MDinput
                v-model="postForm.name"
                :maxlength="300"
                name="name"
                @blur="setSlug"
              >
                Name
              </MDinput>
              <el-tag
                v-show="errors.has('name')"
                type="danger"
                show-icon
              >
                {{ errors.first('name') }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label-width="80px"
                label="Category:"
                class="postInfo-container-item"
              >
                <el-select
                  v-model="postForm.category.id"
                  v-validate="'required'"
                  :remote-method="getRemoteCategoryList"
                  filterable
                  default-first-option
                  remote
                  placeholder="Search category"
                  name="category"
                >
                  <el-option
                    v-for="(item,index) in categoryOptions"
                    :key="item+index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <p>
                  <el-tag
                    v-show="errors.has('category')"
                    type="danger"
                    show-icon
                  >
                    {{ errors.first('category') }}
                  </el-tag>
                </p>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label-width="60px"
                label="Type:"
                class="postInfo-container-item"
              >
                <el-select
                  v-model="postForm.productType.id"
                  v-validate="'required'"
                  :remote-method="getRemoteProductTypeList"
                  filterable
                  default-first-option
                  remote
                  placeholder="Search product type"
                  name="productType"
                >
                  <el-option
                    v-for="(item,index) in productTypeOptions"
                    :key="item+index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <p>
                  <el-tag
                    v-show="errors.has('productType')"
                    type="danger"
                    show-icon
                  >
                    {{ errors.first('productType') }}
                  </el-tag>
                </p>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label-width="60px"
                label="Provider:"
                class="postInfo-container-item"
              >
                <el-select
                  v-model="postForm.provider.id"
                  v-validate="'required'"
                  :remote-method="getRemoteProviderList"
                  filterable
                  default-first-option
                  remote
                  placeholder="Search provider"
                  name="provider"
                  class="md-select"
                >
                  <el-option
                    v-for="(item,index) in providerOptions"
                    :key="item+index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <p>
                  <el-tag
                    v-show="errors.has('provider')"
                    type="danger"
                    show-icon
                  >
                    {{ errors.first('provider') }}
                  </el-tag>
                </p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.price"
                v-validate="'required|numeric|min_value:0'"
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
                v-model="postForm.warranty"
                v-validate="'required|numeric|min_value:0'"
                name="warranty"
              >
                Warranty
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('warranty')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('warranty') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.views"
                v-validate="'required|numeric|min_value:0'"
                placeholder="0"
                name="views"
              >
                Views
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('views')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('views') }}
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
                v-model="postForm.sales"
                v-validate="'numeric|min_value:0'"
                placeholder="0"
                name="sales"
              >
                Sales
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('sales')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('sales') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <MDinput
                v-model="postForm.discount"
                v-validate="'required|numeric|min_value:0'"
                name="discount"
              >
                Discount
              </MDinput>
              <p>
                <el-tag
                  v-show="errors.has('discount')"
                  type="danger"
                  show-icon
                >
                  {{ errors.first('discount') }}
                </el-tag>
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="4">
&nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item
              label-width="60px"
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

        <el-row>
          <el-col :span="24">
            <el-form-item
              label-width="60px"
              label="Avatar:"
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

        <!-- <el-row>
          <el-col :span="24">
            <el-form-item class="postInfo-container-item">
              <images-upload/>
            </el-form-item>
          </el-col>
        </el-row>-->

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
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'
import MDinput from '@/components/MDinput/index.vue'
import Sticky from '@/components/Sticky/index.vue' // 粘性header组件
import { ProductApi, ProviderApi, ProductTypeApi, CategoryApi } from '@/api'
import ImagesUpload from './ImagesUpload/Index.vue'
import slug from 'slug'
import Warning from './Warning.vue'
@Component({
  components: {
    ImagesUpload,
    Tinymce,
    MDinput,
    Sticky,
    Warning
  }
})
export default class ProductDetail extends Vue {
  @Prop({ default: false }) private isEdit!: boolean
  private defaultForm: any = {
    id: undefined,
    name: '',
    slug: '',
    image: '',
    price: '0',
    views: '0',
    sales: '0',
    warranty: '0',
    discount: '0',
    status: 'draft',
    category: {
      id: undefined
    },
    productType: {
      id: undefined
    },
    provider: {
      id: undefined
    },
    content: '',
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  private dataImage: string = ''

  private postForm: any = this.defaultForm
  private loading: boolean = false
  private categoryOptions: [] = []
  private productTypeOptions: [] = []
  private providerOptions: [] = []
  private tempRoute: object = {}

  get lang() {
    return this.$store.getters.language
  }

  private setSlug() {
    this.postForm.slug = slug(this.postForm.name)
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
    const product = await new ProductApi().show(id)
    const categories: any = await new CategoryApi().index()
    const providers: any = await new ProviderApi().index()
    const productTypes: any = await new ProductTypeApi().index()

    this.postForm = product
    this.postForm.productType = product.product_type
    this.categoryOptions = categories.items
    this.productTypeOptions = productTypes.items
    this.providerOptions = providers.items
    this.dataImage = this.postForm.image
    this.setTagsViewTitle()
    this.setPageTitle()
  }
  private setTagsViewTitle() {
    const titleEdit = this.lang === 'vi' ? 'Sửa Sản Phẩm' : 'Edit Product'
    const titleCreate = this.lang === 'vi' ? 'Thêm Sản Phẩm' : 'Add Product'
    let route: {} = {}
    if (this.isEdit) {
      route = Object.assign({}, this.tempRoute, {
        title: `${titleEdit}-${this.postForm.id}`
      })
    } else {
      route = Object.assign({}, this.tempRoute, {
        title: `${titleCreate}`
      })
    }
    this.$store.commit('UPDATE_VISITED_VIEW', route)
  }
  private setPageTitle() {
    const titleEdit = this.lang === 'vi' ? 'Sửa Sản Phẩm' : 'Edit Product'
    const titleCreate = this.lang === 'vi' ? 'Thêm Sản Phẩm' : 'Add Product'
    if (this.isEdit) {
      document.title = `${titleEdit} - ${this.postForm.id}`
    } else {
      document.title = `${titleCreate}`
    }
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
    formData.append('products', JSON.stringify(this.postForm))
    if (typeof this.postForm.image === 'object') {
      formData.append('image', this.postForm.image)
    }
    if (this.isEdit) { formData.append('_method', 'PUT') }
    const res = this.isEdit
      ? await new ProductApi().update(this.postForm.id, formData)
      : await new ProductApi().create(formData)
    this.loading = true
    this.$notify({
      title: 'Success',
      message: 'Product save successfully!',
      type: 'success',
      duration: 2000
    })
    this.postForm.status = true
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

  private async getRemoteCategoryList() {
    const res = await new CategoryApi().index()
    this.categoryOptions = res.items
  }

  private async getRemoteProductTypeList() {
    const res = await new ProductTypeApi().index()
    this.productTypeOptions = res.items
  }

  private async getRemoteProviderList() {
    const res = await new ProviderApi().index()
    this.providerOptions = res.items
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
