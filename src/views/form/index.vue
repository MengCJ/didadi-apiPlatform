<template>
  <div class="wrapper">
    <div
      id="myChart"
      :style="{ width: '100%', height: '500px', 'margin-bottom': '100px' }"
    />
    <!-- <div id="myCharts" :style="{ width: '40%', height: '500px' }" /> -->
  </div>
</template>
<script>
// 引入Echarts
// echarts 5 版本需要把全部的引入进来
import * as echarts from "echarts";
export default {
  name: "From",
  data() {
    return {
      analysisInfo: [],
      totalNum:[]
    };
  },
  mounted() {
    this.getAnalysisInfo();

   
  },
  methods: {
    async getAnalysisInfo() {
      const res = await this.$Api.getAnalysis();
      if (res.code == "20000") {
        res.data.forEach((item) => {
          this.analysisInfo.push(item.name);
          this.totalNum.push(item.totalNum);
        });
     
        
      this.drawLine();
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("myChart"));
      // const myCharts = echarts.init(document.getElementById("myCharts"));
      myChart.setOption({
        title: {
          text: "用户使用接口情况",
          subtext: "列表如下：",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["用户", "使用次数"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: this.analysisInfo,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
        
          {
            name: "使用次数",
            type: "bar",
            data: this.totalNum,
            markPoint: {
              data: [
                { name: "Max", value: 100, xAxis: 4, yAxis: 50 },
                { name: "Min", value: 0, xAxis: 4, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      });
      // myCharts.setOption({
      //   title: {
      //     text: "接口使用情况",
      //     subtext: "具体详情",
      //     left: "center",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //   },
      //   legend: {
      //     orient: "vertical",
      //     left: "left",
      //   },
      //   series: [
      //     {
      //       name: "Access From",
      //       type: "pie",
      //       radius: "50%",
      //       data: [
      //         { value: 1048, name: "Search Engine" },
      //         { value: 735, name: "Direct" },
      //         { value: 580, name: "Email" },
      //         { value: 484, name: "Union Ads" },
      //         { value: 300, name: "Video Ads" },
      //       ],
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: "rgba(0, 0, 0, 0.5)",
      //         },
      //       },
      //     },
      //   ],
      // });
    },
  },
};
</script>
<style lang='scss'>
.wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
