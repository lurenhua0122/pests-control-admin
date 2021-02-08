import request from '@/utils/request'
const api_name = '/educenter/pests'

export default {
  getList() {
    return request({
      url: `${api_name}/findAll`,
      method: 'get'
    })
  },
  // 1 讲师列表（条件查询分页）
  // current当前页 limit每页记录数 teacherQuery条件对象
  getListPage(current, limit, teacherQuery) {
    return request({
      url: `${api_name}/pageControlCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: teacherQuery
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/getPestsControl/${id}`,
      method: 'get'
    })
  },

  save(params) {
    return request({
      url: `${api_name}/addPestsControl`,
      method: 'post',
      data: params
    })
  },

  update(params) {
    return request({
      url: `${api_name}/updatePestsControl`,
      method: 'post',
      data: params
    })
  },

  delete(id) {
    return request({
      url: `${api_name}/removeControl/${id}`,
      method: 'delete'
    })
  }
}
