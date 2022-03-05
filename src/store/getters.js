const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  company: state => state.user.company,
  location: state => state.user.location,
  email: state => state.user.email,
  website: state => state.user.website,
  socialAccount: state => state.user.socialAccount,
  education: state => state.user.education,
  skills: state => state.user.skills,

  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
