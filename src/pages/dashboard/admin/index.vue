<!--
 * @Author: your name
 * @Date: 2022-03-06 16:23:18
 * @LastEditTime: 2022-03-06 21:17:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\pages\dashboard\admin\index.vue
-->
<template>
  <div class="dashboard-editor-container">
    <panel-group :data-count="dataCount" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :category-count="categoryCount" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'

const lineChartData = {
  newVisitis: {
    actualData: [12, 8, 9, 15, 16, 14, 14, 12, 18, 15, 18, 20]
  }
}

const dataCount = {
  article_count: 100,
  like_count: 100,
  comment_count: 100,
  collection_count: 100
}

const categoryCount = [
  { category_name: '前端', count: 76 },
  { category_name: '后端', count: 50 },
  { category_name: '算法', count: 78 },
  { category_name: '人工智能', count: 19 },
  { category_name: '产品', count: 74 },
  { category_name: '设计', count: 17 },
  { category_name: 'Android', count: 24 },
  { category_name: 'IOS', count: 18 },
  { category_name: '运维', count: 51 },
  { category_name: '测试', count: 92 }
]

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      dataCount: dataCount,
      categoryCount: categoryCount
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
