const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  mobile: state => state.user.mobile,
  id: state => state.user.id,
  sex: state => state.user.sex,
  age: state => state.user.age,
  name: state => state.user.name
}
export default getters
