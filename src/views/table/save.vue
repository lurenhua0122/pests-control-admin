<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="编号">
        <el-input v-model="user.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="user.deviceId" :disabled="true" />
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="user.longitude" :disabled="true" />
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="user.latitude" :disabled="true" />
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
        <el-input v-model="user.town" :disabled="true" />
      </el-form-item>
      <el-form-item label="村">
        <el-input v-model="user.village" :disabled="true" />
      </el-form-item>
      <el-form-item label="作业人">
        <el-input v-model="user.operator" />
      </el-form-item>
      <el-form-item label="小班">
        <el-input v-model="user.xb" :disabled="true" />
      </el-form-item>
      <el-form-item label="大班">
        <el-input v-model="user.db" :disabled="true" />
      </el-form-item>
      <el-form-item label="二维码">
        <div class="demo-image">
          <span class="demonstration">{{ user.qrcode }}</span>
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="qrcode.codeUrl"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="项目编号">

        <el-input v-model="user.projectId" :disabled="true">
          <template slot="append">{{ project.name }}</template>
        </el-input>

      </el-form-item>
      <!-- <el-form-item label="逻辑删除">
        <el-select v-model="user.isDeleted" placeholder="please select your type">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="用户ID">

        <el-input v-model="user.userId" :disabled="true">
          <template slot="append">{{ member.mobile }}</template>
        </el-input>

      </el-form-item>
      <el-form-item label="袋数">
        <el-input v-model="user.bagNumber" />
      </el-form-item>
      <el-form-item label="防治业务类型">
        <el-select v-model="user.pestsType" placeholder="please select your Role">
          <el-option v-for="item in pestsTypeoptions" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="user.stime" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import projectApi from '@/api/project'
import memberApi from '@/api/member'
import userApi from '@/api/table'
import qrcodeApi from '@/api/qrcode'

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
      member: {},
      project: {},
      qrcode: {},
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      options: [
        { value: 1, text: '已删除' },
        { value: 0, text: '未删除' }
      ],
      pestsTypeoptions: [
        { value: '诱木', text: '诱木' },
        { value: '诱捕器', text: '诱捕器' },
        { value: '砍倒的树', text: '砍倒的树' }
      ]
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
        this.user = response.data.teacher
        projectApi.getById(this.user.userId).then(response => {
          this.project = response.data.teacher
        })
        memberApi.getById(this.user.projectId).then(response => {
          this.member = response.data.teacher
        })
        qrcodeApi.getOneByQrcode(this.user.qrcode).then(response => {
          this.qrcode = response.data.teacher
        })
      })
    }
  }
}
</script>
