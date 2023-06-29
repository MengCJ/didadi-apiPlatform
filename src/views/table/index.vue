<template>
  <div class="WEB">
    <div v-if="isShow == 0" class="app-container">
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
          <el-button type="primary" size="mini" @click="addsku"
            >+新建</el-button
          >
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
        <el-table-column prop="requestParam" label="请求参数" width="140">
        </el-table-column>
        <el-table-column prop="requestHeader" label="请求头" width="140">
        </el-table-column>
        <el-table-column prop="responseHeader" label="响应头" width="140">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="60">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.status === 1">启用</el-tag>
            <el-tag type="danger" v-if="row.status === 0" >禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="80">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="80">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="{ row }">
            <hint-button
              title="修改"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateInterfaceInfo(row)"
            ></hint-button>
            <hint-button
              v-if="row.status == 0"
              title="发布"
              type="success"
              size="mini"
              icon="el-icon-top"
              @click="pubInterface(row)"
            ></hint-button>
            <hint-button
              v-if="row.status == 1"
              title="下架"
              type="success"
              size="mini"
              icon="el-icon-bottom"
              @click="offInterface(row)"
            ></hint-button>
            <el-popconfirm
              title="这个接口你确定删除吗？"
              @onConfirm="deleytInterface(row)"
            >
              <hint-button
                slot="reference"
                title="删除"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></hint-button>
            </el-popconfirm>
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
            :total="totals"
          />
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next,jumper"
            :total="totals"
          />
        </div>
      </el-card>
    </div>
    <div v-if="isShow == 1" ref="sss">
      <AddSku ref="up"></AddSku>
    </div>
  </div>
</template>

<script>
import AddSku from "@/views/table/addsku/index.vue";
export default {
  components: { AddSku },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      list: [],
      listLoading: true,
      info: [],
      isShow: 0,
      totals: 0,
    };
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    addMsg() {
      this.getinfo();
      this.isShow = 0;
    },
    // 删除接口
    async deleytInterface(row) {
      const res = await this.$Api.deleteInterface({ id: row.id });
      if (res.code == "20000") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.getinfo();
    },
    // 增加接口
    addsku() {
      this.isShow = 1;
    },
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
        this.totals = res.data.total;
      }
    },
    updateInterfaceInfo(row) {
      this.isShow = 1;
      this.$nextTick(() => {
        this.$refs.up.getInterfaceInfo(row);
      });
    },
    // 发布接口
    async pubInterface(row) {
      const res = await this.$Api.onlineInterface({ apiId: row.id });
      if (res.code == "20000") {
        this.$message({
          type: "success",
          message: "上架成功",
        });
      }
      this.getinfo()
    },
    // 下架接口
    async offInterface(row) {
      const res = await this.$Api.offlineInterface({ apiId: row.id });
      if (res.code == "20000") {
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
       this.getinfo()
    },
  },
};
</script>

<style lang='scss'>
.WEB{
  width: 100%;

}
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
