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
        width="50px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Product"
        width="300px"
        column-key="product"
        prop="product"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/products/edit/'+row.product.id"
            class="link-type"
          >
            <span>{{ row.product.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Bill"
        width="150"
        column-key="bill"
        prop="bill"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/bills/edit/'+row.bill.id"
            class="link-type"
          >
            <span>{{ row.bill.description }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Price"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Quantity"
        width="100px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Created At"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Updated At"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="200px"
      >
        <template slot-scope="scope">
          <router-link :to="'/bill-details/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
            >
              Edit
            </el-button>
          </router-link>&nbsp;
          <router-link :to="'/bill-details/delete/'+scope.row.id">
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
import { BillDetailApi } from '@/api/'
import Pagination from '@/components/Pagination/index.vue' // Secondary package based on el-pagination

@Component({
  components: {
    PanThumb,
    Pagination
  },
  filters: {
    statusFilter(status: any) {
      const statusMap: any = {
        true: 'success',
        undefined: 'info',
        false: 'danger'
      }
      return statusMap[status]
    },
    parseTime: filters.parseTime
  }
})
export default class BillDetailList extends Vue {
  private list: [] = []
  private total: number = 0
  private listLoading: boolean = true
  private listQuery: object = {
    page: 1,
    limit: 10
  }

  private created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const res = await new BillDetailApi().index(this.listQuery)
    this.list = res.items
    this.total = res.totalItems
    this.listLoading = false
  }

  private async handleDelete(e: any, id: number) {
    try {
      e.preventDefault()
      const state = await this.$confirm(
        'Confirm to remove this Bill Detail?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      if (state) {
        const res = await new BillDetailApi().delete(id)
        if (res.affected > 0) {
          await this.getList()
          return this.$message({
            type: 'success',
            message: 'Bill detail has been Deleted!'
          })
        }
      }
    } catch (error) {
      if (error === 'cancel') {
        return
      }
      return this.$message({
        type: 'error',
        message: 'Some errors occured. Bill detail has not been Deleted!'
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
