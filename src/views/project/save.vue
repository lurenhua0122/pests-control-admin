<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="用户名" prop="userId">
        <el-input v-model="user.userId" />
      </el-form-item>
      <el-form-item label="文件总数">
        <el-input v-model="user.fileCount" />
      </el-form-item>
      <el-form-item label="实体总数">
        <el-input v-model="user.entities" />
      </el-form-item>
      <el-form-item label="存储空间">
        <el-input v-model="user.deskCount" />
      </el-form-item>
      <el-form-item label="记录总数">
        <el-input v-model="user.recordCount" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="user.gmtCreate" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/project'

const defaultForm = {
  name: '',
  isDeleted: '',
  fileCount: '',
  entities: '',
  deskCount: '',
  userId: '',
  gmtCreate: '',
  recordCount: ''
}

const validatePass = (rule, value, callback) => {
  if (value.length < 1) {
    callback(new Error('密码不能小于1位'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      user: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        name: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        userId: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      // debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.user = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.user.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // 新增讲师
    saveData() {
      userApi.save(this.user).then(response => {
        // debugger
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/project/list' })
        }
      })
    },

    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      userApi.update(this.user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/project/list' })
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      userApi.getById(id).then(response => {
        this.user = response.data.teacher
      })
    }

  }
}
</script>
