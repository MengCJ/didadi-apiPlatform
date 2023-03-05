<template>
  <div class="app-container">
    <!-- v-loading="listLoading" -->

    <div class="top">
      <div class="top_left">
        <div class="top_one">
          <span>接口名称：</span>
          <el-input placeholder="请输入"></el-input>
        </div>
        <div class="top_one">
          <span>接口名称：</span>
          <el-input placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="top_right">
        <el-button size="default">重置</el-button>
        <el-button type="primary" size="default">查询</el-button>
      </div>
    </div>
    <div class="middle">
      <div class="middle-left">查询表格</div>
      <div class="middle-right">
        <el-button type="primary" size="mini">+新建</el-button>
        <i class="el-icon-refresh-right one"></i>
        <i class="el-icon-setting"></i>
      </div>
    </div>
    <!--  @selection-change="handleSelectionChange" -->
    <el-table
      ref="multipleTable"
      :data="info"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column label="id" prop="id" width="50"> </el-table-column>
      <el-table-column prop="name" label="接口名称" width="120">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="60">
      </el-table-column>
      <el-table-column prop="method" label="请求方法" width="60">
      </el-table-column>
      <el-table-column prop="url" label="url" width="240"> </el-table-column>
      <el-table-column prop="address" label="请求参数" width="140">
      </el-table-column>
      <el-table-column prop="requestheader" label="请求头" width="140">
      </el-table-column>
      <el-table-column prop="responseheader" label="响应头" width="140">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="50"> </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="80">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间" width="80">
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="{ row }">
          <hint-button
            title="修改"
            type="primary"
            size="mini"
            icon="el-icon-edit"
          ></hint-button>
          <hint-button
            title="发布"
            type="success"
            size="mini"
            icon="el-icon-top"
          ></hint-button>
          <hint-button
            v-if="false"
            title="下架"
            type="success"
            size="mini"
            icon="el-icon-bottom"
          ></hint-button>
          <hint-button
            title="删除"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
    <el-card>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          :page-sizes="[5, 7, 10]"
          layout="total, sizes "
          :total="400"
        />
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next,jumper"
          :total="400"
          background
        />
      </div>
    </el-card>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      list: [],
      listLoading: true,
      info: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getinfo();
    },
    handleSizeChange(e) {
      this.currentPage = 1;
      this.pageSize = e;
      this.getinfo();
    },
    async getinfo() {
      const res = await this.$Api.getIstInterfaceInfoByPage({
        current: this.currentPage,
        pageSize: this.pageSize,
      });
      if (res.code == "20000") {
        this.info = res.data.records;
      }
    },
  },
};
</script>

<style lang='scss'>
.paging {
  display: flex;
  justify-content: space-between;
  margin: 10px 30px;
}
.middle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .middle-left {
  }
  .middle-right {
    padding-right: 50px;
    .one {
      margin: 0 8px;
    }
  }
}
.top {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .top_left {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    .top_one {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        width: 100px;
        font-size: 14px;
      }
    }
  }
  .top_right {
  }
}
</style>
