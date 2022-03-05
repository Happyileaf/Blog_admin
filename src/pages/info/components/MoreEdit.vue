<template>
  <div class="app-container">
    <el-drawer
      ref="drawer"
      title="我嵌套了 Form !"
      size="37%"
      :before-close="handleClose"
      :visible.sync="drawerShow"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="SocialAccount" :label-width="formLabelWidth">
            <el-card class="socialAccount-card">
              <div
                v-for="(item, index) in socialAccount"
                :key="item.key"
                class="card-wrap"
              >
                <span><span>{{ item.platform }}</span><span>{{ item.account }}</span></span>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteSocialAccount(index)"
                />
              </div>
              <div class="add-wrap">
                <div>
                  <input
                    v-model="socialAccount_platform"
                    class="add-input"
                    placeholder="请输入平台..."
                    autocomplete="off"
                  >
                  <input
                    v-model="socialAccount_account"
                    class="add-input"
                    placeholder="请输入账号..."
                    autocomplete="off"
                  >
                </div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="addSocialAccount"
                />
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="Education" :label-width="formLabelWidth">
            <el-card class="education-card">
              <div
                v-for="(item, index) in education"
                :key="item.key"
                class="card-wrap"
              >
                {{ item }}
                <div>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteEducateionExp(index)"
                  />
                </div>
              </div>
              <div class="add-wrap">
                <input
                  v-model="education_exp_item"
                  class="add-input"
                  type="text"
                  placeholder="请添加教育经历..."
                >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="addEducateionExp"
                />
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="Skills" :label-width="formLabelWidth">
            <el-card class="skills-card">
              <div
                v-for="(item, index) in skills"
                :key="item.key"
                class="card-wrap"
              >
                <span><span>{{ item.name }}</span><span>{{ item.process }}</span></span>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteSkill(index)"
                />
              </div>
              <div class="add-wrap">
                <div>
                  <input
                    v-model="skill_name"
                    class="add-input"
                    placeholder="请添加技能..."
                    autocomplete="off"
                  >
                  <input
                    v-model="skill_process"
                    class="add-input"
                    placeholder="请添加进度..."
                    autocomplete="off"
                  >
                </div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="addSkill"
                />
              </div>
            </el-card>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submit"> 确 定 </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { education, skills } from '@/constant/user'

export default {
  name: 'Profile',
  components: {},
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      form: {},
      formLabelWidth: '100px',
      socialAccount: [],
      education: [],
      skills: [],
      socialAccount_platform: undefined,
      socialAccount_account: undefined,
      socialAccount_avatar: '123456',
      education_exp_item: undefined,
      skill_name: undefined,
      skill_process: undefined
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar', 'roles']),
    drawerShow: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('close', value)
      }
    }
  },
  created() {
    this.socialAccount = [...this.user.socialAccount]
    this.education = [...this.user.education]
    this.skills = [...this.user.skills]
  },
  methods: {
    handleClose(done) {
      this.$confirm('还有未保存的工作，确定要关闭吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    cancelForm() {
      this.drawerShow = false
    },
    addSocialAccount() {
      if (
        !this.socialAccount_platform ||
        !this.socialAccount_account ||
        !this.socialAccount_avatar
      ) { return }
      this.socialAccount.push({
        platform: this.socialAccount_platform,
        account: this.socialAccount_account,
        avatar:
          'https://img2.baidu.com/it/u=2251201040,4120245779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      })
      this.socialAccount_platform = ''
      this.socialAccount_account = ''
      this.socialAccount_avatar = '123456'
    },
    deleteSocialAccount(index) {
      this.socialAccount.splice(index, 1)
    },
    addEducateionExp() {
      console.log('check')
      if (!this.education_exp_item) return
      this.education.push(this.education_exp_item)
      this.education_exp_item = ''
    },
    deleteEducateionExp(index) {
      this.education.splice(index, 1)
    },
    addSkill() {
      if (!this.skill_name || !this.skill_process) return
      this.skills.push({
        name: this.skill_name,
        process: this.skill_process
      })
      this.skill_name = ''
      this.skill_process = ''
    },
    deleteSkill(index) {
      this.skills.splice(index, 1)
    },
    submit() {
      const query = {
        education: this.education,
        skills: this.skills,
        socialAccount: this.socialAccount
      }
      this.$emit('submit', query)
      this.drawerShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.demo-drawer__content {
  display: flex;
  flex-direction: column;
  // min-height: 100%;
  padding: 10px 20px;

  overflow: auto;

  form {
    flex: 1;
  }

  .add-wrap {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    margin: 10px 0;
    input,
    button {
      margin: 0 0 0 10px;
    }
  }
  .demo-drawer__footer {
    display: flex;
    padding: 0;

    button {
      flex: 1;
    }
  }

  .add-input {
    flex: 1 1 auto;
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

  .card-wrap {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  .skills-card,
  .socialAccount-card {
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
::v-deep .el-drawer__body {
  overflow: auto;
}
::v-deep .el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>
