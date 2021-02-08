<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="user.id" />
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="user.deviceId" />
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="user.longitude" />
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="user.latitude" />
      </el-form-item>
      <el-form-item label="定位误差（米）">
        <el-input v-model="user.positionError" />
      </el-form-item>
      <el-form-item label="树径">
        <el-input v-model="user.treeWalk" />
      </el-form-item>
      <el-form-item label="砍倒照片">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="user.fellPic"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="树桩照片">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="user.stumpPic"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="处理好照片">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="user.finishPic"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="镇">
        <el-input v-model="user.town" />
      </el-form-item>
      <el-form-item label="村">
        <el-input v-model="user.village" />
      </el-form-item>
      <el-form-item label="作业人">
        <el-input v-model="user.operator" />
      </el-form-item>
      <el-form-item label="小班">
        <el-input v-model="user.xb" />
      </el-form-item>
      <el-form-item label="大班">
        <el-input v-model="user.db" />
      </el-form-item>
      <el-form-item label="二维码">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="user.qrcode"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="项目编号">
        <el-input v-model="user.projectId" />
      </el-form-item>
      <el-form-item label="逻辑删除">
        <el-select v-model="user.isDeleted" placeholder="please select your type">
          <el-option label="APP用户" value="1" />
          <el-option label="平台用户" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="user.userId" />
      </el-form-item>
      <el-form-item label="袋数">
        <el-input v-model="user.bagNumber" />
      </el-form-item>
      <el-form-item label="防治业务类型">
        <el-select v-model="user.pestsType" placeholder="please select your Role">
          <el-option label="ADMIN" value="ADMIN" />
          <el-option label="GUEST" value="GUEST" />
          <el-option label="USER" value="USER" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="user.stime" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/table'

const defaultForm = {
  id: '',
  deviceId: '',
  stime: '',
  longitude: '',
  latitude: '',
  positionError: '',
  treeWalk: '',
  fellPic: '',
  stumpPic: '',
  finishPic: '',
  town: '',
  village: '',
  operator: '',
  xb: '',
  db: '',
  qrcode: '',
  projectId: '',
  isDeleted: '',
  gmtCreate: '',
  gmtModified: '',
  userId: '',
  bagNumber: '',
  appId: '',
  pestsType: ''
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
      user: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
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
          this.$router.push({ path: '/example/table' })
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
          this.$router.push({ path: '/example/table' })
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      userApi.getById(id).then(response => {
        this.user = response.data
      })
    }

  }
}
</script>
