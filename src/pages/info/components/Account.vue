<!--
 * @Author: your name
 * @Date: 2022-03-04 09:38:12
 * @LastEditTime: 2022-03-28 16:33:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\pages\info\components\Account.vue
-->
<template>
  <el-form label-width="80px">
    <el-form-item label="Name">
      <el-input v-model.trim="userInfo.nick_name" />
    </el-form-item>
    <el-form-item label="Intro">
      <el-input v-model.trim="userInfo.introduction" />
    </el-form-item>
    <el-form-item label="Company">
      <el-input v-model.trim="userInfo.company" />
    </el-form-item>
    <el-form-item label="Location">
      <el-input v-model.trim="userInfo.location" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="userInfo.email" />
    </el-form-item>
    <el-form-item label="Website">
      <el-input v-model.trim="userInfo.website" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
      <el-button type="primary" @click="show = true">MoreEdit</el-button>
    </el-form-item>

    <MoreEdit
      v-model="show"
      :user="user"
      @close="show = false"
      @submit="mergeInfo"
    />
  </el-form>
</template>

<script>
import MoreEdit from './MoreEdit.vue'
import { updateInfo } from '@/api/user'
import { updateUserInfo } from '@/api/userInfo'
export default {
  components: {
    MoreEdit
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      show: false,
      userInfo: {}
    }
  },
  computed: {
    userCopy() {
      return { ...this.user }
    }
  },
  watch: {
    user: function(newValue, oldValue) {
      this.userInfo = newValue
    }
  },
  created() {
    this.userInfo = { ...this.user }
  },
  methods: {
    async submit() {
      const query = { ...this.userInfo }
      console.log('this.user')
      console.log(query)
      const { res, err } = await updateUserInfo(query)
      if (res) {
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('update')
      }
    },
    mergeInfo(query) {
      this.userInfo = { ...this.userInfo, ...query }
      console.log('check merge')
      console.log({ ...query })
    }
  }
}
</script>
