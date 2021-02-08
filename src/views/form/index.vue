<template>
  <div class="app-container">
    <el-form ref="member" :model="member" label-width="120px">
      <el-form-item label="手机号">
        <el-input v-model="member.mobile" />
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="member.nickname" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="member.age" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="member.sex" placeholder="please select">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="member.avatar"
            />
          </div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="member.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="member.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="member.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="member.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="member.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="member.desc" type="textarea" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const defaultForm = {
  nickname: '',
  id: '',
  name: '',
  sex: '',
  age: '',
  avatar: '',
  mobile: ''
}

export default {
  data() {
    return {
      member: defaultForm,
      options: [
        { value: 1, text: '男' },
        { value: 0, text: '女' }
      ]

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
  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    // 表单初始化
    init() {
      // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
      this.qrmembercode = { ...defaultForm }
      this.member.id = this.$store.state.user.id
      this.member.nickname = this.$store.state.user.nickname
      this.member.name = this.$store.state.user.name
      this.member.sex = this.$store.state.user.sex
      this.member.age = this.$store.state.user.age
      this.member.avatar = this.$store.state.user.avatar
      this.member.mobile = this.$store.state.user.mobile
      // }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

