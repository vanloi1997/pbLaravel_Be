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
        align="center"
        label="Name"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/categories/edit/'+row.id"
            class="link-type"
          >
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Created At"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Updated At"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
      >
        <template slot-scope="scope">
          <router-link :to="'/categories/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
            >
              Edit
            </el-button>
          </router-link>&nbsp;
          <router-link :to="'/categories/delete/'+scope.row.id">
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
import { CategoryApi } from '@/api/'
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
export default class CategoryList extends Vue {
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
    const res = await new CategoryApi().index(this.listQuery)
    this.list = res.items
    this.total = res.totalItems
    this.listLoading = false
  }

  private async handleDelete(e: any, id: number) {
    try {
      e.preventDefault()
      const state = await this.$confirm(
        'Confirm to remove this Category?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      if (state) {
        const res = await new CategoryApi().delete(id)
        if (res.affected > 0) {
          await this.getList()
          return this.$message({
            type: 'success',
            message: 'Category has been Deleted!'
          })
        }
      }
    } catch (error) {
      if (error === 'cancel') {
        return
      }
      return this.$message({
        type: 'error',
        message: 'Some errors occured. Category has not been Deleted!'
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
