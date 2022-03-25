<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchQuery.user_id"
        placeholder="用户ID"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-input
        v-model="searchQuery.user_name"
        placeholder="用户名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-input
        v-model="searchQuery.roles"
        placeholder="角色"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-input
        v-model="searchQuery.email"
        placeholder="邮箱"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-select
        v-model="searchQuery.status"
        placeholder="分类"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in user_status"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="user_id" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="150" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" min-width="150" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.roles }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.email
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="介绍" min-width="200" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.intro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | userStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status != 1"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 1)"
          >
            激活
          </el-button>
          <el-button
            v-if="row.status != 0"
            size="mini"
            @click="handleModifyStatus(row, 0)"
          >
            冻结
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="searchQuery.pageNum"
      :limit.sync="searchQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="账号" prop="user_id">
          <el-input v-model="temp.user_id" disabled />
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="temp.user_name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select
            v-model="temp.roles"
            multiple
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in ROLES"
              :key="item.key"
              :label="item.display_name"
              :value="item.display_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input v-model="temp.intro" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in user_status"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchUserList,
  fetchUser,
  createUser,
  updateUser,
  activateOrFreezeUser,
  deleteUser
} from '@/api/user-manage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import {
  ARTICLE_ITEM,
  ATRICLE_STATUS,
  ATRICLE_STATUS_KV
} from '@/constant/user'

import { userInfo, USER_STATUS, USER_STATUS_KV } from '@/constant/user'
import { ARTICLE_CATEGORY } from '@/constant/type'
import { ROLES } from '@/constant/roles'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    },
    userStatusFilter(key) {
      return USER_STATUS_KV[key]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: userInfo,
      user_status: USER_STATUS,
      ROLES: ROLES,
      total: 0,
      listLoading: true,
      searchQuery: {
        pageNum: 1,
        pageSize: 20
      },
      searchQueryCopy: {},
      articleCategoryOptions: ARTICLE_CATEGORY,
      articleStatusOptions: ATRICLE_STATUS,
      temp: {
        user_id: undefined,
        user_name: '',
        roles: [],
        email: '',
        intro: '',
        status: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        user_name: [
          { required: true, message: 'user_name is required', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: 'roles is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'email is required', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: 'intro is required', trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'status is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.searchQueryCopy = { ...this.searchQuery }
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      console.log(this.searchQueryCopy)
      const { res } = await fetchUserList(this.searchQueryCopy)
      console.log(res)

      if (res) {
        this.list = res.result.list
        this.listLoading = false
      }
    },
    handleSearch() {
      this.searchQueryCopy = { ...this.searchQuery }
      this.searchQuery.pageNum = 1
      this.getList()
    },
    async handleModifyStatus(row, status) {
      const obj = {
        user_id: row.user_id,
        status: status
      }
      const { res } = await activateOrFreezeUser(obj)
      if (res) {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        row.status = status
      }
    },
    resetTemp() {
      this.temp = {
        user_id: undefined,
        user_name: '',
        roles: [],
        email: '',
        intro: '',
        status: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          // this.temp.roles = this.temp.roles.join(',')
          console.log(this.temp)
          const { res, err } = await createUser(this.temp)
          if (res) {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    handleUpdate(row) {
      this.temp = { ...row } // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          const tempData = { ...this.temp }
          console.log(tempData)
          const { res, err } = await updateUser(tempData)
          if (res) {
            const index = this.list.findIndex((v) => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    async handleDelete(row, index) {
      const { res } = await deleteUser(row.user_id)
      if (res) {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
