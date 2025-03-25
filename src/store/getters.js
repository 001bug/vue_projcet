const getters = {
  sidebar: state => state.app.sidebar,//这些操作是指取模块属性
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,//用户头像
  userId: state=> state.user.userInfo.userId,
  name: state => state.user.userInfo.username//用户名称
}//更有利于便捷访问
export default getters
