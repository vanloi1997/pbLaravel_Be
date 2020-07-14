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
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Total Amount"
        width="110"
        prop="totalAmount"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.totalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="User"
        width="150"
        column-key="user"
        prop="user"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/users/edit/'+row.user.id"
            class="link-type"
          >
            <span>{{ row.user.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Bill State"
        width="150"
        column-key="user"
        prop="user"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/bill-states/edit/'+row.billState.id"
            class="link-type"
          >
            <span>{{ row.billState.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Description"
        width="110"
        prop="description"
      >
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
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
      >
        <template slot-scope="scope">
          <router-link :to="'/bills/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
            >
              Edit
            </el-button>
          </router-link>&nbsp;
          <router-link :to="'/bills/delete/'+scope.row.id">
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
import { BillApi } from '@/api/'
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
export default class BillList extends Vue {
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
    const res = await new BillApi().index(this.listQuery)
    this.list = res.items
    this.total = res.totalItems
    this.listLoading = false
  }

  private async handleDelete(e: any, id: number) {
    try {
      e.preventDefault()
      const state = await this.$confirm(
        'Confirm to remove this Bill?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      if (state) {
        const res = await new BillApi().delete(id)
        if (res.affected > 0) {
          await this.getList()
          return this.$message({
            type: 'success',
            message: 'Bill has been Deleted!'
          })
        }
      }
    } catch (error) {
      if (error === 'cancel') {
        return
      }
      return this.$message({
        type: 'error',
        message: 'Some errors occured. Bill has not been Deleted!'
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
