<template>
  <div class="createPost-container">
    <div class="editor-header">
      <input
        v-model="postForm.title"
        class="title-input"
        type="text"
        placeholder="请输入文章标题..."
      >
      <div class="editor-btn">
        <!-- <el-button type="primary" plain @click="draftArticle">存草稿</el-button> -->
        <el-button type="primary" @click="submitDialog = true">发布</el-button>
      </div>
    </div>
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <!-- <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="postForm.content" :height="500" />
        </el-form-item> -->
        <Viewer />
        <el-form-item prop="content" style="margin-bottom: 30px padding:0">
          <ByteMD
            ref="editor"
            :content="postForm.content"
            @changeCentent="updateContent"
          />
        </el-form-item>
        <el-drawer
          title="发布"
          :size="'37%'"
          :before-close="handleClose"
          :visible.sync="submitDialog"
          direction="rtl"
          custom-class="demo-drawer"
        >
          <div class="demo-drawer__content editor-details">
            <el-form ref="drawer" :model="postForm" :rules="rules">
              <el-form-item
                label="分类"
                prop="category_id"
                :label-width="formLabelWidth"
              >
                <el-select v-model="postForm.category_id" placeholder="请选择">
                  <el-option
                    v-for="item in ARTICLE_CATEGORY"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="标签"
                prop="tag_ids"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="postForm.tag_ids"
                  filterable
                  multiple
                  remote
                  :remote-method="getTagList"
                  placeholder="请选择标签"
                  @focus="getTagList"
                >
                  <el-option
                    v-for="item in ARTICLE_TAG"
                    :key="item.tag_id"
                    :label="item.tag_name"
                    :value="item.tag_id"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                label="文章封面"
                prop="imageUrl"
                :label-width="formLabelWidth"
              >
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item> -->
              <el-form-item
                label="编辑摘要"
                prop="brief_content"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="postForm.brief_content"
                  type="textarea"
                  :rows="6"
                  placeholder="请输入编辑摘要"
                />
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button
                type="primary"
                :loading="loading"
                @click="submitForm"
              >{{ loading ? "提交中 ..." : "确 定" }}</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </el-form>
  </div>
</template>

<script>
import ByteMD from '@/components/ByteMD'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle, createArticle, updateArticle } from '@/api/article'
import { fetchCategoryList } from '@/api/category'
import { fetchTagList } from '@/api/tag'
import { searchUser } from '@/api/remote-search'

import store from '@/store'
import { Editor, Viewer } from '@bytemd/vue'
import { ARTICLE_CATEGORY, ARTICLE_TAG } from '@/constant/type'
import { ARTICLE_UNIT } from '@/constant/article'

const defaultArticle = {
  article_id: '',
  user_id: 0,
  category_id: '',
  tag_ids: [],
  link_url: '',
  cover_image: '',
  title: '',
  brief_content: '',
  content: '',
  ctime: '',
  mtime: '',
  rtime: '',
  status: undefined
}

export default {
  name: 'ArticleDetail',
  components: {
    ByteMD,
    Viewer,
    Tinymce,
    Upload,
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultArticle),
      loading: false,
      tagListOptions: [],
      rules: {
        category_id: [{ validator: validateRequire }],
        tag_ids: [{ validator: validateRequire }]
      },

      submitDialog: false,
      formLabelWidth: '100px',
      imageUrl: '',

      ARTICLE_CATEGORY,
      ARTICLE_TAG,
      ARTICLE_UNIT
    }
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time)
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = (this.$route.query && this.$route.query.article_id) || 7
      this.fetchData(id)
    }
    console.log('store.getters.user_id')
    console.log(this.$store.state.user.user_id)
    console.log(store.getters.token)
    this.getCategoryList()
    this.getTagList()
  },
  methods: {
    async getCategoryList() {
      const { res, err } = await fetchCategoryList({
        status: 1,
        pageNum: 1,
        pageSize: 10000
      })
      if (res) {
        this.ARTICLE_CATEGORY = res.result.list
      }
    },
    async getTagList() {
      const { res, err } = await fetchTagList({
        status: 1,
        pageNum: 1,
        pageSize: 10000
      })
      if (res) {
        console.log('tag res')
        console.log(res)
        this.ARTICLE_TAG = res.result.list
      }
    },
    async fetchData(id) {
      console.log(id)
      const { res, err } = await fetchArticle(id)
      console.log('res')
      console.log(res)
      if (res) {
        console.log(res)
        const { tag_ids, content } = res.result
        this.postForm = res.result
        this.postForm.tag_ids = JSON.parse(this.postForm.tag_ids)
        this.$refs.editor.value = content
        console.log(this.postForm)
      } else {
        console.log(err)
      }
    },
    submitForm() {
      console.log(this.postForm)
      console.log('submitForm')
      this.$refs.drawer.validate((valid) => {
        if (valid) {
          this.publishArticle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async publishArticle() {
      if (!this.titleCheck() || !this.contentCheck()) {
        return
      }
      const query = { ...this.postForm, status: 1, user_id: 20 }
      const handler = !this.isEdit ? createArticle : updateArticle
      console.log('query')
      console.log(this.$store.getters.user_id)
      console.log(query)

      const { res, err } = await handler(query)
      if (res) {
        this.$notify({
          title: 'Success',
          message: 'create Successfully',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          path: '/article/articleList',
          query: {}
        })
      }
    },
    draftArticle() {
      if (!this.titleCheck() || !this.contentCheck()) {
        return
      }
      const query = { ...this.postForm, status: 1 }
      const handler = !this.isEdit ? createArticle : updateArticle
      const { res, err } = handler(query)
      if (res || 1) {
      }
    },
    getRemoteTagList() {
      // const { res, err } = getTagList();
      // if (res || 1) {
      //   this.tagListOptions = ARTICLE_TAG;
      // }
      this.tagListOptions = ARTICLE_TAG
    },
    handleClose(done) {
      console.log(this.postForm)
      if (this.loading) {
        return
      }
      this.$confirm('工作还未保存，确定要关闭吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    cancelForm() {
      this.loading = false
      this.submitDialog = false
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    titleCheck() {
      if (this.postForm.title === '') {
        this.$message({
          message: `请输入文章标题`,
          type: 'error'
        })
        return false
      }
      return true
    },
    contentCheck() {
      if (this.postForm.content === '') {
        this.$message({
          message: `文章内容不能为空`,
          type: 'error'
        })
        return false
      }
      return true
    },
    updateContent(value) {
      this.postForm.content = value
      console.log(this.postForm.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .editor-header {
    display: flex;
    align-items: center;

    padding: 0 27px;
    height: 5.334rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;

    .title-input {
      flex: 1 1 auto;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
    }

    .editor-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .createPost-main-container {
    padding: 20px 20px;

    ::v-deep {
      .el-form-item__content {
        line-height: 24px;
      }

      .editor-details {
        padding: 0 15px 50px 15px;
      }

      .demo-drawer__content {
        display: flex;
        flex-direction: column;
        height: 100%;

        form {
          flex: 1;
        }
      }

      .demo-drawer__footer {
        display: flex;
        padding: 0;

        button {
          flex: 1;
        }
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
