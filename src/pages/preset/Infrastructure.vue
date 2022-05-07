<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>首页轮播图</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        />
      </div>
      <div class="card-content carousel">
        <div class="carousel-wrap">
          <el-carousel :autoplay="false" :interval="5000" arrow="always">
            <el-carousel-item
              v-for="(item, index) in carouselImgList"
              :key="index"
              class="carousel-img-wrap"
            >
              <img :src="item.picture_url" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="update-wrap">
          <div
            v-for="(item, index) in carouselImgList"
            :key="index"
            class="content-wrap"
          >
            <span>{{ item.picture_url }}</span>
            <div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteCarouselImg(item.picture_id)"
              />
            </div>
          </div>
          <div class="add-wrap">
            <input
              v-model="carouselImg"
              class="add-input"
              placeholder="请输入图片地址..."
              autocomplete="off"
            >

            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="addCarouselImg"
            />
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>导航推荐</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        />
      </div>
      <div class="card-content recommendation-nav">
        <div class="recommendation-nav-wrap">
          <a
            v-for="(item, index) in recommendationNavList"
            :key="index"
            :href="item.nav_url"
            target="_blank"
          ><img
            :src="item.nav_logo"
            alt=""
          ></a>
        </div>
        <div class="update-wrap">
          <div
            v-for="(item, index) in recommendationNavList"
            :key="index"
            class="content-wrap"
          >
            <span><span>{{ item.nav_name }}</span><span>{{ item.nav_url }}</span></span>
            <div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteRecommendationNav(item.nav_id)"
              />
            </div>
          </div>
          <div class="add-wrap">
            <div>
              <input
                v-model="recommendationNav.nav_name"
                class="add-input"
                placeholder="请输入名称..."
                autocomplete="off"
              >
              <input
                v-model="recommendationNav.nav_url"
                class="add-input"
                placeholder="请输入URL..."
                autocomplete="off"
              >
              <input
                v-model="recommendationNav.nav_logo"
                class="add-input"
                placeholder="请输入Logo..."
                autocomplete="off"
              >
              <input
                v-model="recommendationNav.nav_intro"
                class="add-input"
                placeholder="请输入介绍..."
                autocomplete="off"
              >
              <input
                v-model="recommendationNav.nav_type"
                class="add-input"
                placeholder="请输入类型..."
                autocomplete="off"
              >
            </div>

            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="addRecommendationNav"
            />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { INDEX_PAGE_CAROUSEL_IMG, RECOMMENDATION_NAV } from '@/constant/preset'

import {
  fetchCarouselImgList,
  createCarouselImg,
  deleteCarouselImg,
  fetchRecommendationNavList,
  createRecommendationNav,
  deleteRecommendationNav
} from '@/api/preset'

export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      user: {},
      activeTab: 'activity',
      carouselImgList: INDEX_PAGE_CAROUSEL_IMG,
      carouselImg: '',
      recommendationNavList: RECOMMENDATION_NAV,
      recommendationNav: {}
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getData()
  },
  methods: {
    async getCarouselImg() {
      const { res, err } = await fetchCarouselImgList()
      if (res) {
        console.log(res)
        this.carouselImgList = res.result.list
      }
    },
    async getRecommendationNav() {
      const { res, err } = await fetchRecommendationNavList()
      if (res) {
        console.log(res)
        this.recommendationNavList = res.result.list
      }
    },
    getData() {
      this.getCarouselImg()
      this.getRecommendationNav()
    },
    async addCarouselImg() {
      if (!this.carouselImg) return
      const { res, err } = await createCarouselImg({
        picture_url: this.carouselImg
      })
      if (res) {
        console.log(res)
        this.getCarouselImg()
        this.carouselImg = ''
      }
    },
    async deleteCarouselImg(id) {
      const { res, err } = await deleteCarouselImg(id)
      if (res) {
        console.log(res)
        this.getCarouselImg()
      }
    },
    async addRecommendationNav() {
      const { nav_name, nav_url, nav_logo, nav_intro, nav_type } =
        this.recommendationNav
      if (!nav_name || !nav_url || !nav_logo || !nav_intro || !nav_type) return
      const { res, err } = await createRecommendationNav({
        nav_name,
        nav_url,
        nav_logo,
        nav_intro,
        nav_type
      })
      if (res) {
        this.getRecommendationNav()
        this.recommendationNav = {}
      }
    },
    async deleteRecommendationNav(id) {
      const { res, err } = await deleteRecommendationNav(id)
      if (res) {
        this.getRecommendationNav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin: 0 0 30px 0;
  .card-content {
    display: flex;
    .update-wrap {
      flex: 0.5;
      padding: 0 30px;
      font-size: 15px;
    }

    .content-wrap {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }

    .add-wrap {
      width: 100%;
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      input,
      button {
        margin: 0 0 0 10px;
      }
    }

    .add-input {
      flex: 1 1 auto;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      border-bottom: 1px solid #dfe6ec;
      outline: none;
    }
  }
  .card-content.carousel {
    display: flex;
    .carousel-wrap {
      flex: 0.5;
      .carousel-img-wrap {
        display: flex;
        justify-content: center;
      }
    }
  }
  .card-content.recommendation-nav {
    .recommendation-nav-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      place-items: center center;
      grid-gap: 15px 15px;
      flex: 0.5;
      a {
        width: 65%;
        height: 65%;
        display: flex;
        align-items: center;
      }
      img {
        width: 100%;
      }
    }
    .add-wrap {
      display: flex;
      div {
        flex: 1;
      }
      flex-wrap: wrap;
      input {
        width: 50%;
        margin: 10px 0;
      }
    }
    span {
      width: 100%;
      display: flex;
      justify-content: space-between;
      > span {
        margin: 0 0 0 10px;
      }
    }
  }
}
</style>
