<template>
  <div class="dashboard-container">
    <h1 class="tilie"><i class="el-icon-menu"></i> 滴答滴 - 开放API</h1>
    <ul class="jiekou-list">
      <li v-for="(pages, index) in pageList" :key="index">
        <div class="left">
          <div class="left_one">
            <el-button type="primary">{{ pages.method }}</el-button>
            <h2>{{ pages.name }}</h2>
          </div>
          <h2 class="jiekouname">{{ pages.description }}</h2>
        </div>
        <div class="rgiht" @click="lookMessage(pages.id)">
          <span>查&ensp;&ensp;看</span>
        </div>
      </li>
    </ul>

    <el-card>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 7]"
          :page-size="100"
          layout="total, sizes "
          :total="total"
        />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next,jumper"
          :total="total"
          background=""
        />
      </div>
    </el-card>
    <div class="author">
      <div class="authorname">Author: <span>didididi | dadadada</span></div>
      <div class="beian">
        滴答滴API开放平台 <span>| 桂ICP备2023001955号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      total: 0,
      pageList: [],
    };
  },
  methods: {
    async getpage() {
      const res = await this.$Api.getIstInterfaceInfoByPage({
        current: this.currentPage,
        pageSize: this.pagesize,
      });
      if (res.code == "20000") {
        this.total = res.data.total;
        this.pageList = res.data.records;
      }
    },
    handleSizeChange(e) {
      this.pagesize = e;
      this.currentPage = 1;
      this.getpage();
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getpage();
    },
    lookMessage(id) {
      this.$router.push(`/detail?id=${id}`);
    },
  },
  mounted() {
    this.getpage();
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0 20px;
  .tilie {
    font-family: "W04";
    .el-icon-menu {
      color: rgb(251, 182, 72);
    }
  }
  .el-pagination {
    // height: 300px;
  }
  .paging {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
  }
  .jiekou-list {
    li {
      padding-right: 0 0 50px 10px;
      width: 100%;
      // line-height: 50px;
      display: flex;
      background-color: #eff7ff;

      justify-content: space-between;
      position: relative;
      border-bottom: 1px solid #d3cece;
      margin-bottom: 2px;
      .left {
        width: 600px;
        display: flex;
        flex-direction: column;
        .left_one {
          width: 100%;

          .el-button {
            float: left;
            font-size: 18px;
            font-family: "W02";
          }
          h2 {
            margin: 0px;
            line-height: 45px;
            margin-left: 10px;
            font-size: 18px;
            float: left;
            // font-weight: bold;
            // font-family: "W01";
          }
        }

        .jiekouname {
          color: gray;
          font-size: 16px;
        }
      }
      .rgiht {
        position: absolute;
        right: 40px;
        top: 40px;
        cursor: pointer;
        font-family: "W03";
        span {
          color: #000;
          font: bold;
          font-size: 18px;
        }
      }
    }
  }
}
.author {
  
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  margin-top: 20px;
  float: right;
  // -moz-user-select: none; /* Firefox私有属性 */
  // -webkit-user-select: none; /* WebKit内核私有属性 */
  // -khtml-user-select: none; /* KHTML内核私有属性 */
  user-select: none; /* CSS3属性 */
  .authorname {
    font-family: "W04";

    span {
      font-family: "W03";
    }
  }
  .beian {
    font-family: "w04";
    span {
      font-family: "W03";
    }
  }
}
</style>
