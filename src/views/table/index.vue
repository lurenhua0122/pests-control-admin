<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="pestsControlQuery.deviceId" clearable placeholder="采集设备">
          <el-option v-for="item in memberList" :key="item.nickname" :value="item.nickname" :label="item.nickname" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="pestsControlQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="pestsControlQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="warning" @click="exportExcel()">导出</el-button>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      id="pestsTable"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="采集时间">
        <template slot-scope="scope">
          {{ scope.row.stime }}
        </template>
      </el-table-column>
      <el-table-column label="采集设备">
        <template slot-scope="scope">
          {{ scope.row.deviceId }}
        </template>
      </el-table-column>
      <el-table-column label="树径">
        <template slot-scope="scope">
          <span>{{ scope.row.treeWalk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="砍倒照片">
        <template slot-scope="scope">
          <img :src="scope.row.fellPic" style="width: 100px;height: 100px;" :title="scope.row.fellPic">
          {{ scope.row.fellPic }}
        </template>
      </el-table-column>
      <el-table-column label="树桩照片">
        <template slot-scope="scope">
          <img :src="scope.row.stumpPic" style="width: 100px;height: 100px;" :title="scope.row.stumpPic">
          {{ scope.row.stumpPic }}
        </template>
      </el-table-column>
      <el-table-column label="处理好照片">
        <template slot-scope="scope">
          <img :src="scope.row.finishPic" style="width: 100px;height: 100px;" :title="scope.row.finishPic">
          {{ scope.row.finishPic }}
        </template>
      </el-table-column>
      <el-table-column label="镇">
        <template slot-scope="scope">
          {{ scope.row.town }}
        </template>
      </el-table-column>
      <el-table-column label="村">
        <template slot-scope="scope">
          {{ scope.row.village }}
        </template>
      </el-table-column>
      <el-table-column label="作业人">
        <template slot-scope="scope">
          {{ scope.row.operator }}
        </template>
      </el-table-column>
      <el-table-column label="小班">
        <template slot-scope="scope">
          {{ scope.row.xb }}
        </template>
      </el-table-column>
      <el-table-column label="大班" align="center">
        <template slot-scope="scope">
          {{ scope.row.db }}
        </template>
      </el-table-column>
      <el-table-column label="二维码" align="center">
        <template slot-scope="scope">
          {{ scope.row.qrcode }}
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
        </template>
      </el-table-column>
      <el-table-column label="定位误差（米）" align="center">
        <template slot-scope="scope">
          {{ scope.row.positionError }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="项目编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.projectId }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="逻辑删除" align="center">
        <template slot-scope="scope">
          {{ scope.row.isDeleted }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column> -->
      <el-table-column label="袋数" align="center">
        <template slot-scope="scope">
          {{ scope.row.bagNumber }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="APP的ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.appId }}
        </template>
      </el-table-column> -->
      <el-table-column label="业务类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.pestsType }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/example/update/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import pestsControl from '@/api/table'
import memberApi from '@/api/member'
// 引入导出Excel表格依赖
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  // 写核心代码位置
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      memberList: null,
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      pestsControlQuery: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
    this.getMember()
  },
  methods: {
    // 定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#pestsTable'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'sheetjs.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      pestsControl.getListPage(this.page, this.limit, this.pestsControlQuery).then((response) => {
        // 请求成功
        // response接口返回的数据
        // console.log(response)
        this.list = response.data.rows
        this.total = response.data.total
        console.log(this.list)
        console.log(this.total)
      })
    },
    getMember() {
      memberApi.getList().then(response => {
        this.memberList = response.data.items
      })
    },
    resetData() {
      // 清空的方法
      // 表单输入项数据清空
      this.pestsControlQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 删除讲师的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，执行then方法
        // 调用删除的方法
        pestsControl.delete(id).then((response) => {
          // 删除成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 回到列表页面
          this.getList()
        })
      }) // 点击取消，执行catch方法
    }
  }
}
</script>
