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
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        {{ user }}
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
      'name',
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
    getUser() {
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
      this.user = {
        ...userInfo
      }
    }
  }
}
</script>
