const getters = {
  sidebar: state => state.app.sidebar,//这些操作是指取模块属性
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}//更有利于便捷访问
export default getters
