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
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="Date"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="Author"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        label="Importance"
      >
        <template slot-scope="scope">
          <el-rate
            :value="scope.row.importance"
            :max="3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :low-threshold="1"
            :high-threshold="3"
            :disabled="true"
          />
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        min-width="300px"
        label="Title"
      >
        <template slot-scope="{row}">
          <router-link
            :to="'/example/edit/'+row.id"
            class="link-type"
          >
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              Edit
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
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination/index.vue' // Secondary package based on el-pagination

@Component({
  components: {
    Pagination
  },
  filters: {
    statusFilter(status: any) {
      const statusMap: any = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime: filters.parseTime
  }
})
export default class ArticletList extends Vue {
  private list: [] = [];
  private total: number = 0;
  private listLoading: boolean = true;
  private listQuery: object = {
    page: 1,
    limit: 20
  };

  private created() {
    this.getList()
  }

  private getList() {
    this.listLoading = true
    fetchList(this.listQuery).then(response => {
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    })
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
