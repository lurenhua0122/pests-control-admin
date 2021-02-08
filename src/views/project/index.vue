<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="query.name" clearable placeholder="项目名称">
          <el-option v-for="item in list" :key="item.name" :value="item.name" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="query.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
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
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="删除？">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDeleted | statusFilter">{{ scope.row.isDeleted | formatStata }}</el-tag> -->
      <!-- {{ scope.row.isDeleted }} -->
      <!-- </template>
      </el-table-column> -->
      <el-table-column label="文件总数">
        <template slot-scope="scope">
          <span>{{ scope.row.fileCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实体总数">
        <template slot-scope="scope">
          {{ scope.row.entities }}
        </template>
      </el-table-column>
      <el-table-column label="硬盘空间">
        <template slot-scope="scope">
          {{ scope.row.deskCount }}
        </template>
      </el-table-column>
      <el-table-column label="记录总数">
        <template slot-scope="scope">
          {{ scope.row.recordCount }}
        </template>
      </el-table-column>
      <el-table-column label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/project/update/' + scope.row.id">
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
import pestsControl from '@/api/project'

export default {
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'danger'
      }
      return statusMap[status]
    },
    // 状态显示转换
    formatStata(status) {
      const statusMap = {
        0: '存在',
        1: '删除'
      }
      return statusMap[status]
    }
  },
  // 写核心代码位置
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      query: {} // 条件封装对象
    }
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
  },
  methods: {
    // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      pestsControl.getListPage(this.page, this.limit, this.query).then((response) => {
        // 请求成功
        // response接口返回的数据
        // console.log(response)
        this.list = response.data.rows
        this.total = response.data.total
        console.log(this.list)
        console.log(this.total)
      })
    },
    resetData() {
      // 清空的方法
      // 表单输入项数据清空
      this.query = {}
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
