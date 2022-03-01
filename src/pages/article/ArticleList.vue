<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchQuery.title"
        placeholder="标题"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-input
        v-model="searchQuery.author"
        placeholder="作者"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-select
        v-model="searchQuery.category"
        placeholder="分类"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in articleCategoryOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="searchQuery.tags"
        placeholder="标签"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in articleCategoryOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="searchQuery.status"
        placeholder="状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in articleStatusOptions"
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
      <el-table-column label="ID" prop="id" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.article_info.article_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="200" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.article_info.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author_user_info.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="100" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
          <el-tag effect="dark">{{ row.category.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" width="100">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
          <div v-for="item in row.tags" :key="item.tag_id">
            <el-tag>{{ item.tag_name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="100" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.article_info.ctime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="100" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.article_info.rtime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.status.push_status | statusFilter">
            {{ row.status.push_status | articleStatusFilter }}
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
            v-if="row.status.push_status != 1"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 1)"
          >
            发布
          </el-button>
          <el-button
            v-if="row.status.push_status != 0"
            size="mini"
            @click="handleModifyStatus(row, 0)"
          >
            草稿
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
      :page.sync="searchQuery.page"
      :limit.sync="searchQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  fetchList,
  fetchArticle,
  createArticle,
  updateArticle,
  publishOrDraftArticle,
  deleteArticle,
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import {
  ARTICLE_ITEM,
  ATRICLE_STATUS,
  ATRICLE_STATUS_KV,
} from "@/constant/article";
import { ARTICLE_CATEGORY } from "@/constant/type";

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
    articleStatusFilter(key) {
      return ATRICLE_STATUS_KV[key];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: ARTICLE_ITEM,
      total: 0,
      listLoading: true,
      searchQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      searchQueryCopy: {},
      articleCategoryOptions: ARTICLE_CATEGORY,
      articleStatusOptions: ATRICLE_STATUS,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
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
    getList() {
      this.listLoading = true;
      const { res } = fetchList(this.searchQueryCopy);
      if (res || 1) {
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.searchQueryCopy = { ...this.searchQuery };
      this.searchQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      const obj = {
        article_id: row.article_id,
        push_status: status,
      };
      const { res } = publishOrDraftArticle(obj);
      if (res || 1) {
        this.$message({
          message: "操作Success",
          type: "success",
        });
        row.status.push_status = status;
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },
    handleCreate() {
      this.$router.push({ path: "/article/issue", query: {} });
    },
    handleUpdate(row) {
      this.$router.push({
        path: "/article/issue",
        query: { article_id: row.article_id },
      });
    },
    handleDelete(row, index) {
      const { res } = deleteArticle(row.article_id);
      if (res || 1) {
        this.$notify({
          title: "Success",
          message: "Delete Successfully",
          type: "success",
          duration: 2000,
        });
        this.list.splice(index, 1);
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
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
