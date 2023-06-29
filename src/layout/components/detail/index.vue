<template>
  <div class="wrpper">
    <div class="address">
      <el-button type="primary" size="default">{{ info.method }}</el-button>
      <el-input placeholder="请输入内容" v-model="info.url"> </el-input>
    </div>

    <div style="margin-top: 10px" class="getmessage">
      <div class="top">
        <span>{{ info.name }}</span>
      </div>
      <div class="bottom">描述：{{ info.description }}</div>
    </div>
    <div class="tab" style="margin-top: 20px">
      <button
        :class="['tabtn', show ? 'active' : '']"
        style="margin-right: 10px"
        @click="show = true"
      >
        文档
      </button>
      <button :class="['tabtn', !show ? 'active' : '']" @click="show = false">
        调试
      </button>
    </div>
    <div style="margin-top: 30px" class="ones" v-if="show">
      <div class="one">
        <div class="qingtou">请求头</div>
        <div class="qingcon">{{ info.requestHeader }}</div>
      </div>
      <div class="one">
        <div class="qingtou">响应头</div>
        <div class="qingcon">{{ info.responseHeader }}</div>
      </div>
      <div class="one">
        <div class="qingtoutwo">请求参数</div>
        <div class="qingcontwo">
          {{ info.requestParam }}
        </div>
      </div>
    </div>

    <div class="test" v-else>
      <div class="test_name">在线调试</div>

      <div class="test_text">
        <textarea
          style="width: 100%"
          wrap="off"
          cols="30"
          rows="10"
          class="card"
          v-model="parameters"
        ></textarea>
      </div>
      <el-button type="primary" @click="send">发送</el-button>
      <div class="text" v-show="showData.length !== 0">
        <div class="fanhui">返回结果：</div>
        <div class="card">
          <json-viewer
            :value="value"
            copyable
            :expand-depth="5"
            sort
          ></json-viewer>
        </div>
      </div>
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
      info: "",
      // 展示文档或者调试
      show: true,
      parameters: "",
      showData: "",
      value: "",
      copyable: {
        copeText: "复制",
        copiedText: "已复制",
        timeout: "2000",
      },
    };
  },
  methods: {
    async send() {
      const { method, name } = this.info;
      let res = "";
      if (!this.parameters) {
        res = await this.$Api.getInvoke(name, method);
      } else {
        res = await this.$Api.getInvoke(
          name,
          method,
          JSON.parse(this.parameters)
        );
      }
      if (res.code == "20000") {
        this.value = res;
        this.showData = JSON.stringify(res, null, 2);
      }
    },
    async getinfo() {
      const res = await this.$Api.getInfo(this.$route.query.id);
      if (res.code == "20000") {
        this.info = res.data;
      }
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

.tabtn {
  border: none;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  // background-color: #0985e8
  height: 40px;
  width: 100px;
  border-radius: 20%;
  clip-path: polygon(
    0 0,
    5% 0,
    5% 15%,
    10% 15%,
    10% 0,
    100% 0,
    100% 75%,
    95% 75%,
    95% 85%,
    100% 85%,
    100% 100%,
    50% 100%,
    50% 85%,
    45% 85%,
    45% 100%,
    0 100%,
    0 65%,
    5% 65%,
    5% 50%,
    0 50%,
    0 0
  );
  border-top-right-radius: 5px;
  border-right: #aebdb7 2px solid;
  border-bottom: #b0bab1 2px solid;
  transition: all 0.6s ease;
}

.tabtn:active {
  transition: all 0.01s ease;
  border-right: #aebdb7 0 solid;
  border-bottom: #b0bab1 0 solid;
  user-select: none;
  transform: translateX(1px) translateY(1px);
}
.card {
  width: 90%;
  border: none;
  // min-height: 10px;
  // background: rgb(236, 236, 236);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
  // rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.text {
  display: flex;
  margin-top: 30px;
  .fanhui {
    width: 8%;
    text-align: center;
  }
  .card {
    width: 90%;
    // min-height: 10px;
    // background: rgb(236, 236, 236);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
    // rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
}
.active {
  background: #66b1ff;
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
  border-radius: 10px;
  .qingtou {
    width: 20%;
    // height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 18px;
    font-family: "W03";
    border-right: 1px solid #000;
    border-radius: 10px;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
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
}
</style>