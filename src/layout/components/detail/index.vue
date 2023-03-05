<template>
  <div class="wrpper">
    <div class="address">
      <el-button type="primary" size="default">{{info.method}}</el-button>
      <el-input  placeholder="请输入内容" v-model="info.url" > </el-input>
    </div>
    <div style="margin-top: 30px" class="getmessage">
      <div class="top"><span>{{info.name}}</span></div>
      <div class="bottom">描述：{{info.description}}</div>
    </div>
    <div style="margin-top: 30px" class="ones">
      <div class="one">
        <div class="qingtou">请求头</div>
        <div class="qingcon">{{info.requestheader}}</div>
      </div>
      <div class="one">
        <div class="qingtou">响应头</div>
        <div class="qingcon">{{info.responseheader}}</div>
      </div>
      <div class="one">
        <div class="qingtoutwo">请求参数</div>
        <div class="qingcontwo">
          {{ info }}
        </div>
      </div>
    </div>
    <div class="test">
      <div class="test_name">在线调试</div>
      <div class="test_text">
        <textarea
          name=""
          style="width: 100%"
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <el-button type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      input1: "12121",
      input2: "",
      input3: "",
      select: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      info: {},
    };
  },
  methods: {
    async getinfo() {
      const res = await this.$Api.getInfo(this.$route.query.id);
      if (res.code == "20000") {
        this.info = res.data
      }
    },
  },
  computed: {
    info1() {
      return this.info.replace(/[\n\r]/gi, "<br/>");
    },
  },
  mounted() {
    this.getinfo();
  },
};
</script>

<style lang='scss'>
input,
button,
select,
textarea {
  outline: none;
}
textarea {
  resize: none;
}
.ones {
  // border-bottom: 1px solid #000;
}
.one {
  display: flex;
  justify-content: space-around;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
  .qingtou {
    width: 20%;
    // height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 18px;
    font-family: "W03";
    border-right: 1px solid #000;
  }
  .qingcon {
    width: 80%;

    line-height: 80px;
    font-size: 20px;
    padding-left: 10px;
    border-right: 1px solid #000;
  }
  .qingtoutwo {
    width: 20%;
    height: 150px;
    text-align: center;
    line-height: 150px;
  }
  .qingcontwo {
    width: 80%;
    height: 150px;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
  }
}
.address {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .el-button {
    // width: 4%;
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: "W03";
    display: flex;
    justify-items: center;
    justify-content: center;
  }
  .el-input {
    // width: 94%;
  }
}
.test {
  padding: 10px 20px;
  margin-top: 30px;
  .test_name {
    font-size: 18px;
    font-family: "W03";
  }
  .el-button {
    font-family: "W03";
    font-size: 18px;
  }
}
.getmessage {
  .top {
    width: 100%;
    line-height: 50px;
    border: 1px solid #e7e7e7;
    padding-left: 5px;
    span {
      font-family: "W03";
      font-size: 16px;
    }
  }
  .bottom {
    width: 100%;
    line-height: 50px;
    border: 1px solid #e7e7e7;
    padding-left: 5px;
    font-family: "W03";
    font-size: 18px;
  }
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.wrpper {
  padding: 20px 50px 0 50px;
  background: #eff7ff;
}
</style>