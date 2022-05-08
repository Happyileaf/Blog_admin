<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchQuery.category_id"
        placeholder="分类ID"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-input
        v-model="searchQuery.category_name"
        placeholder="分类名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <!-- <el-input
        v-model="searchQuery.rank"
        placeholder="排序"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      /> -->
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
      <el-table-column
        label="分类ID"
        prop="category_id"
        align="center"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ row.category_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类名称"
        prop="category_name"
        min-width="150"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类URL"
        prop="category_url"
        width="110"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.category_url }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="排序" prop="rank" width="200" align="center">
        <template slot-scope="{ row }">
          {{ row.rank }}
        </template>
      </el-table-column> -->
      <el-table-column
        label="背景"
        prop="back_ground"
        min-width="200"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.back_ground }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        class-name="status-col"
        width="100"
      >
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
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="分类ID" prop="category_id">
          <el-input v-model="temp.category_id" disabled />
        </el-form-item>
        <el-form-item label="分类名称" prop="category_name">
          <el-input v-model="temp.category_name" />
        </el-form-item>
        <el-form-item label="分类URL" prop="category_url">
          <el-input v-model="temp.category_url" />
        </el-form-item>
        <el-form-item label="排序" prop="rank">
          <el-input v-model="temp.rank" />
        </el-form-item>
        <el-form-item label="背景" prop="back_ground">
          <el-input v-model="temp.back_ground" />
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
  fetchCategoryList,
  fetchCategory,
  createCategory,
  updateCategory,
  activateOrFreezeCategory,
  deleteCategory,
} from "@/api/category";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import {
  ARTICLE_ITEM,
  ATRICLE_STATUS,
  ATRICLE_STATUS_KV,
} from "@/constant/user";

import { userInfo, USER_STATUS, USER_STATUS_KV } from "@/constant/user";
import { ARTICLE_CATEGORY, CATEGORY_LIST } from "@/constant/type";
import { ROLES } from "@/constant/roles";

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "info",
      };
      return statusMap[status];
    },
    userStatusFilter(key) {
      return USER_STATUS_KV[key];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: CATEGORY_LIST,
      user_status: USER_STATUS,
      ROLES: ROLES,
      total: 0,
      listLoading: true,
      searchQuery: {
        pageNum: 1,
        pageSize: 20,
      },
      searchQueryCopy: {},
      articleCategoryOptions: ARTICLE_CATEGORY,
      articleStatusOptions: ATRICLE_STATUS,
      temp: {
        category_id: 0,
        category_name: "",
        category_url: "",
        rank: 0,
        back_ground: "",
        status: 0,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      rules: {
        category_name: [
          { required: true, message: "username is required", trigger: "blur" },
        ],
        category_url: [
          { required: true, message: "roles is required", trigger: "blur" },
        ],
        rank: [
          { required: true, message: "email is required", trigger: "blur" },
        ],
        back_ground: [
          {
            required: true,
            message: "introduction is required",
            trigger: "blur",
          },
        ],
        status: [
          { required: true, message: "status is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.searchQueryCopy = { ...this.searchQuery };
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      this.searchQueryCopy = { ...this.searchQuery };
      console.log(this.searchQueryCopy);
      const { res, err } = await fetchCategoryList(this.searchQueryCopy);
      console.log(res);
      if (res) {
        this.list = res.result.list;
        this.total = res.result.total;
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.searchQueryCopy = { ...this.searchQuery };
      this.searchQuery.pageNum = 1;
      this.getList();
    },
    async handleModifyStatus(row, status) {
      const obj = {
        category_id: row.category_id,
        status: status,
      };
      const { res, err } = await activateOrFreezeCategory(obj);
      if (res) {
        this.$message({
          message: "操作Success",
          type: "success",
        });
        row.status = status;
        this.getList();
      }
    },
    resetTemp() {
      this.temp = {
        category_id: undefined,
        category_name: "",
        category_url: "",
        rank: undefined,
        back_ground: "",
        status: undefined,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    async createData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          console.log(this.temp);
          const { res, err } = await createCategory(this.temp);
          if (res) {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            console.log(this.dialogFormVisible);
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
            this.getList();
          }
        }
      });
    },
    handleUpdate(row) {
      this.temp = { ...row }; // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    async updateData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          const tempData = { ...this.temp };
          const { res, err } = await updateCategory(tempData);
          if (res) {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
            this.getList();
          }
        }
      });
    },
    async handleDelete(row, index) {
      const { res, err } = await deleteCategory(row.category_id);
      if (res) {
        this.$notify({
          title: "Success",
          message: "Delete Successfully",
          type: "success",
          duration: 2000,
        });
        this.list.splice(index, 1);
        this.getList();
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "category_id",
          "category_name",
          "category_url",
          "status",
          "create_time",
          "update_time",
        ];
        const filterVal = [
          "category_id",
          "category_name",
          "category_url",
          "status",
          "create_time",
          "update_time",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>
