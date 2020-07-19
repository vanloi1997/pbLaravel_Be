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
            :to="'/users/edit/'+row.id"
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
            :image="row.avatar"
            class="panThumb"
          />
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Phone No."
        width="110"
        prop="phone"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Address"
        prop="address"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Email"
        prop="email"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Login Count"
        prop="loginCount"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.signInCount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Failed Attempts"
        prop="failedAttempts"
        sortable
      >
        <template slot-scope="{row}">
          <span>{{ row.failedAttempts }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Active"
        width="110"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.isActive | statusFilter">
            {{ row.isActive }}
          </el-tag>
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
          <router-link :to="'/users/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
            >
              Edit
            </el-button>
          </router-link>&nbsp;
          <router-link :to="'/users/delete/'+scope.row.id">
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
import { UserApi } from '@/api'
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
export default class UserList extends Vue {
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
    const res = await new UserApi().index(this.listQuery)
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
        'Confirm to remove this User?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      if (state) {
        const res = await new UserApi().delete(id)
        if (res.affected > 0) {
          await this.getList()
          return this.$message({
            type: 'success',
            message: 'User has been Deleted!',
            duration: 2000
          })
        }
      }
    } catch (error) {
      if (error === 'cancel') {
        return
      }
      return this.$message({
        type: 'error',
        message: 'Some errors occured. User has not been Deleted!'
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
