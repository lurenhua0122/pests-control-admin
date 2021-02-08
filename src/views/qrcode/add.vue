<template>
  <div class="app-container">
    <el-form ref="qrcode" :model="qrcode" :rules="validateRules" label-width="120px">
      <el-form-item label="生成数量" prop="initNumber">
        <el-input v-model="qrcode.initNumber" />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-select v-model="qrcode.userId">
          <el-option v-for="item in memberList" :key="item.id" :value="item.id" :label="item.mobile" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="initData">初始化记录</el-button>
        <el-button type="primary" @click="initOne">生成一条记录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qrcodeApi from '@/api/qrcode'
import memberApi from '@/api/member'

const defaultForm = {
  initNumber: '100',
  userId: '1'
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
      memberList: null,
      qrcode: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        userId: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        initNumber: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'id',
      'name',
      'sex',
      'age',
      'avatar',
      'mobile'
    ])
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
      // // debugger
      // if (this.$route.params && this.$route.params.id) {
      //   const id = this.$route.params.id
      //   this.fetchDataById(id)
      // } else {
      // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
      this.qrcode = { ...defaultForm }
      this.qrcode.userId = this.$store.state.user.id
      this.qrcode.name = this.$store.state.user.nickname
      this.getList()
      // }
    },

    // saveOrUpdate() {
    //   this.$refs.user.validate(valid => {
    //     if (valid) {
    //       this.saveBtnDisabled = true // 防止表单重复提交
    //       if (!this.user.id) {
    //         this.saveData()
    //       } else {
    //         this.updateData()
    //       }
    //     }
    //   })
    // },

    // 新增讲师
    initData() {
      qrcodeApi.initQrcode(this.qrcode).then(response => {
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
    initOne() {
      qrcodeApi.initOneQrcode(this.qrcode.userId).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/qrcode/list' })
        }
      })
    },
    // // 根据id更新记录
    // updateData() {
    //   // teacher数据的获取
    //   qrcodeApi.update(this.user).then(response => {
    //     if (response.success) {
    //       this.$message({
    //         type: 'success',
    //         message: response.message
    //       })
    //       this.$router.push({ path: '/qrcode/list' })
    //     }
    //   })
    // },

    // 根据id查询记录
    getList() {
      memberApi.getList().then(response => {
        this.memberList = response.data.items
      })
    }

  }
}
</script>
