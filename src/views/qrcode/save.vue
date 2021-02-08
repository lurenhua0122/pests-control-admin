<template>
  <div class="app-container">
    <el-form ref="qrcode" :model="qrcode" :rules="validateRules" label-width="120px">
      <el-form-item label="ID" prop="username">
        <el-input v-model="qrcode.id" />
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="qrcode.userId" />
      </el-form-item>
      <el-form-item label="二维码编号">
        <el-input v-model="qrcode.codeNumber" />
      </el-form-item>
      <el-form-item label="删除？">
        <el-select v-model="qrcode.isDeleted" placeholder="please select your type">
          <el-option label="删除" value="1" />
          <el-option label="在用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="二维码">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="qrcode.codeUrl"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="qrcode.stime" type="date" placeholder="Pick a date" style="width: 100%;" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import qrcodeApi from '@/api/qrcode'

const defaultForm = {
  id: '',
  codeNumber: '',
  codeUrl: '',
  userId: '',
  isDeleted: '',
  gmtCreate: '',
  gmtModified: '',
  stime: ''
}

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      qrcode: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        codeNumber: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
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
        this.qrcode = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.$refs.qrcode.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.qrcode.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // 新增讲师
    saveData() {
      qrcodeApi.save(this.qrcode).then(response => {
        // debugger
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/qrcode/list' })
        }
      })
    },

    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      qrcodeApi.update(this.qrcode).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/qrcode/list' })
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      qrcodeApi.getById(id).then(response => {
        this.qrcode = response.data.teacher
      })
    }

  }
}
</script>
