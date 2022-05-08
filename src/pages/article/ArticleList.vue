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
        v-model="searchQuery.user_id"
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
          :key="item.category_id"
          :label="item.category_name"
          :value="item.category_id"
        />
      </el-select>
      <!-- <el-select
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
      </el-select> -->
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
          <span>{{ row.article_info.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="100" align="center">
        <template slot-scope="{ row }">
          <el-tag effect="dark">{{ row.category_info.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" width="100">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
          <div v-for="item in row.tags_info" :key="item.tag_id">
            <el-tag>{{ item.tag_name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="100" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.c }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="100" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.article_info.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.article_info.status | statusFilter">
            {{ row.article_info.status | articleStatusFilter }}
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
            v-if="row.article_info.status != 1"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 1)"
          >
            发布
          </el-button>
          <el-button
            v-if="row.article_info.status != 0"
            size="mini"
            @click="handleModifyStatus(row, 0)"
          >
            草稿
          </el-button>
          <el-button
            v-if="row.article_info.status != 'deleted'"
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

import { fetchCategoryList } from "@/api/category";

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
      list: [],
      total: 0,
      listLoading: true,
      searchQuery: {
        pageNum: 1,
        pageSize: 20,
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
    this.getCategoryList();
    this.getList();
  },
  methods: {
    async getCategoryList() {
      const { res, err } = await fetchCategoryList({
        status: 1,
        pageNum: 1,
        pageSize: 10000,
      });
      if (res) {
        this.articleCategoryOptions = res.result.list;
      }
    },
    async getList() {
      this.listLoading = true;
      this.searchQueryCopy = { ...this.searchQuery };
      console.log("this.searchQueryCopy");
      console.log(this.searchQueryCopy);
      const { res, err } = await fetchList(this.searchQueryCopy);
      console.log(res);
      if (res) {
        this.list = res.result.list;
        this.total = res.result.total;
        console.log("this.list");
        console.log(res.result);
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
        article_id: row.article_info.article_id,
        status: status,
      };
      const { res } = await publishOrDraftArticle(obj);
      if (res) {
        this.$message({
          message: "操作Success",
          type: "success",
        });
        row.article_info.status = status;
        this.getList();
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
        query: { article_id: row.article_info.article_id },
      });
    },
    async handleDelete(row, index) {
      const { res } = await deleteArticle(row.article_info.article_id);
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
          "article_id",
          "user_id",
          "category_id",
          "tag_ids",
          "link_url",
          "cover_image",
          "title",
          "brief_content",
          "content",
          "visible_level",
          "view_count",
          "status",
          "create_time",
          "update_time",
        ];
        const filterVal = [
          "article_id",
          "user_id",
          "category_id",
          "tag_ids",
          "link_url",
          "cover_image",
          "title",
          "brief_content",
          "content",
          "visible_level",
          "view_count",
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
            return parseTime(v.article_info[j]);
          } else {
            return v.article_info[j];
          }
        })
      );
    },
  },
};
</script>
