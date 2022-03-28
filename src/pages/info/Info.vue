<!--
 * @Author: your name
 * @Date: 2022-03-04 09:38:12
 * @LastEditTime: 2022-03-28 16:34:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\pages\info\Info.vue
-->
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" style="height: 100%" />
        </el-col>
        <el-col :span="6" :xs="24">
          <user-info :user="user" style="height: 100%" />
        </el-col>

        <el-col :span="12" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <account :user="user" @update="getUser" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import UserInfo from './components/UserInfo'
import Account from './components/Account'

import { userInfo } from '@/constant/user'

import { fetchUserInfo, updateUserInfo } from '@/api/userInfo'

export default {
  name: 'Profile',
  components: { UserCard, UserInfo, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'username',
      'roles',
      'avatar',
      'introduction',
      'company',
      'location',
      'email',
      'website',
      'socialAccount',
      'education',
      'skills'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      // this.user = {
      //   name: this.name,
      //   roles: this.roles,
      //   avatar: this.avatar,
      //   introduction: this.introduction,
      //   company: this.company,
      //   location: this.location,
      //   email: this.email,
      //   website: this.website,
      //   education: this.education,
      //   skills: this.skills,
      // };

      const user_id = this.$store.state.user.user_id
      const { res, err } = await fetchUserInfo({ user_id })
      console.log(res.result.skills)
      this.user = res.result

      // this.user = {
      //   ...userInfo[0]
      // }
    }
  }
}
</script>
