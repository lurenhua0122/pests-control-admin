import request from '@/utils/request'
const api_name = '/educenter/member'
export default {
  getList() {
    return request({
      url: `${api_name}/findAll`,
      method: 'get'
    })
  },

  // 1 讲师列表（条件查询分页）
  // current当前页 limit每页记录数 teacherQuery条件对象
  getListPage(current, limit, projectQuery) {
    return request({
      url: `${api_name}/page/condition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: projectQuery
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/getOne/${id}`,
      method: 'get'
    })
  },

  save(params) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: params
    })
  },

  update(params) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: params
    })
  },

  delete(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }

}
