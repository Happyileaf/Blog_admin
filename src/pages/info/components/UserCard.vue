<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.roles }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.nick_name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.roles }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-introduction user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="email" /><span>Intro</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduction }}
          </div>
        </div>
      </div>

      <div class="user-company user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="email" /><span>Company</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{ user.company }}</div>
        </div>
      </div>

      <div class="user-location user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="email" /><span>Location</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{ user.location }}</div>
        </div>
      </div>

      <div class="user-email user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="email" /><span>Email</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{ user.email }}</div>
        </div>
      </div>

      <div class="user-website user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="email" /><span>Website</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{ user.website }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .user-bio-section:not(.user-introduction) {
    display: flex;
    justify-content: space-between;
    .user-bio-section-header {
      border-bottom: 0px solid #dfe6ec;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-weight: bold;
    }
  }
}
</style>
