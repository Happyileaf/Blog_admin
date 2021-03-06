import { login, logout, getInfo, updataInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { verify } from '@/utils/token'

const state = {
  token: getToken(),
  user_id: undefined,
  username: '',
  avatar: '',
  introduction: '',
  roles: [],
  company: '',
  location: '',
  email: '',
  website: '',
  socialAccount: [],
  education: [],
  skills: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_USERNAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMIAL: (state, email) => {
    state.email = email
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },

  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  SET_COMPANY: (state, company) => {
    state.company = company
  },
  SET_LOCATION: (state, location) => {
    state.location = location
  },
  SET_EMIAL: (state, email) => {
    state.email = email
  },
  SET_WEBSITE: (state, website) => {
    state.website = website
  },
  SET_EDUCATION: (state, education) => {
    state.education = education
  },
  SET_SKILLS: (state, skills) => {
    state.skills = skills
  },
  SET_SOCIALACCOUNT: (state, socialAccount) => {
    state.socialAccount = socialAccount
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_name: username.trim(), password: password }).then(response => {
        const { res } = response
        commit('SET_TOKEN', res.result.token)
        setToken(res.result.token)
        const { user_id, user_name, roles, email, status } = verify(res.result.token)
        commit('SET_USERID', user_id)
        commit('SET_USERNAME', user_name)
        commit('SET_ROLES', roles)
        commit('SET_EMIAL', email)
        commit('SET_STATUS', status)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { roles, name, avatar, introduction,
          company,
          location,
          email,
          website,
          socialAccount,
          education,
          skills } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_USERNAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_COMPANY', company)
        commit('SET_LOCATION', location)
        commit('SET_EMIAL', email)
        commit('SET_WEBSITE', website)
        commit('SET_SOCIALACCOUNT', socialAccount)
        commit('SET_EDUCATION', education)
        commit('SET_SKILLS', skills)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateInfo({ dispatch, commit, state }, data) {
    return new Promise((resolve, reject) => {
      const query = { ...data, token: state.token }
      updataInfo(query).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        dispatch('user/getInfo')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
