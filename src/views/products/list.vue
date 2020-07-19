<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="ID"
        width="80"
        prop="id"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="Name"
        prop="name"
        sortable
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/products/edit/'+row.id"
            class="link-type"
          >
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        label="Avatar"
      >
        <template slot-scope="{row}">
          <pan-thumb
            :image="row.image"
            class="panThumb"
          />
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Price"
        width="110"
        prop="price"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Views"
        width="70"
        prop="views"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.views }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Sales"
        width="70"
        prop="sales"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.sales }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Warranty"
        width="100"
        prop="warranty"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.warranty }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Category"
        width="150"
        column-key="category"
        prop="category"
        :filters="categoryOptions | parseTableFilter"
        :filter-method="filterHandler"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/categories/edit/'+row.category.id"
            class="link-type"
          >
            <span>{{ row.category.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Product Type"
        width="150"
        column-key="productType"
        prop="productType"
        :filters="productTypeOptions | parseTableFilter"
        :filter-method="filterHandler"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/product-types/edit/'+row.product_type.id"
            class="link-type"
          >
            <span>{{ row.product_type.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Provider"
        width="150"
        column-key="provider"
        prop="provider"
        :filters="providerOptions | parseTableFilter"
        :filter-method="filterHandler"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/providers/edit/'+row.provider.id"
            class="link-type"
          >
            <span>{{ row.provider.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        align="center"
        label="Created At"
        prop="createdAt"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        align="center"
        label="Updated At"
        prop="updatedAt"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="200px"
      >
        <template slot-scope="scope">
          <router-link :to="'/products/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
            >
              Edit
            </el-button>
          </router-link>&nbsp;
          <router-link :to="'/products/delete/'+scope.row.id">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete($event, scope.row.id)"
            >
              Delete
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as filters from '@/filters'
import PanThumb from '@/components/PanThumb/index.vue'
import { ProductApi, ProviderApi, ProductTypeApi, CategoryApi } from '@/api'
import Pagination from '@/components/Pagination/index.vue' // Secondary package based on el-pagination

@Component({
  components: {
    PanThumb,
    Pagination
  },
  filters: {
    statusFilter: (status: any) => {
      const statusMap: any = {
        true: 'success',
        undefined: 'info',
        false: 'danger'
      }
      return statusMap[status]
    },
    parseTableFilter: (list: object[]) => {
      const newList: object[] = []
      list.forEach((item: any) => {
        newList.push({ text: item.name, value: item.id })
      })
      return newList
    },
    parseTime: filters.parseTime
  }
})
export default class ProductList extends Vue {
  private list: [] = []
  private total: number = 0
  private listLoading: boolean = true
  private categoryOptions: [] = []
  private productTypeOptions: [] = []
  private providerOptions: [] = []
  private listQuery: object = {
    page: 1,
    limit: 10
  }

  private created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const res = await new ProductApi().index(this.listQuery)
    const categories: any = await new CategoryApi().index()
    const providers: any = await new ProviderApi().index()
    const productTypes: any = await new ProductTypeApi().index()
    this.categoryOptions = categories.items
    this.productTypeOptions = productTypes.items
    this.providerOptions = providers.items
    this.list = res.items
    this.total = res.totalItems
    this.listLoading = false
  }

  private filterHandler(value: string, row: any, column: any) {
    const property = column['property']
    return row[property].id === value
  }

  private async handleDelete(e: any, id: number) {
    try {
      e.preventDefault()
      const state = await this.$confirm(
        'Confirm to remove this Product?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      if (state) {
        const res = await new ProductApi().delete(id)
        if (res.affected > 0) {
          await this.getList()
          return this.$message({
            type: 'success',
            message: 'Product has been Deleted!'
          })
        }
      }
    } catch (error) {
      if (error === 'cancel') {
        return
      }
      return this.$message({
        type: 'error',
        message: 'Some errors occured. Product has not been Deleted!'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
