<template>
  <div>
    <div class="tutorial">
      <div class="introduction">
        <h2 class="door">快速入门</h2>
        <div class="loader">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>

      <hr />
      <ul>
        <li>下面将介绍如何快速使用滴答滴-api平台的开放接口</li>
        <li>其实很简单，只需要使用我们提供的SDK进行方法的调用即可</li>
      </ul>
      <br />
      <br />
      <h2>一、导入SDK</h2>
     <div class="first">
       <ul>
        <li>首先去gitee上将SDK的代码拉取下来</li>
        <li>gitee代码仓库：https://gitee.com/tcj-hua/apiplatform-sdk.git</li>
        <li>拉去下来之后使用依赖：</li>
      </ul>
      <div style="overflow: auto">
        <pre v-highlight>
            <code>{{info}}</code>
        </pre>
      </div>
     </div>
      <h2>二、获取到自己的ak与sk</h2>
      <div class="first">
        <div>点击首页右上角头像，查看自己的ak与sk，再配置到自己的配置文件中</div>
      <div class="infoColor">
        <pre>
      didididi:
  api:
    accessKey: "didididi"
    secreKey: "didididi"
          </pre
        >
      </div>
      </div>
      <h2>三、测试调用：</h2>
     <div class="first">
       <div class="infoColor">
        <pre>{{ java }}</pre>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manger",
  data() {
    return {
      userInfo: `   <dependency>
            <groupId>io.gitee.tcj-hua</groupId>
            <artifactId>didididi-api-sdk</artifactId>
            <version>1.0-SNAPSHOT</version>
             </dependency>`,
      java: `
@RestController
@RequestMapping("/invoke/interface")
public class InterfaceInvokeController {

    @Autowired
    public DidididiClient client;

    /**
     * 获取HelloWorld字符串
     * @return
     */
    @PostMapping("/getHelloWorld")
    public BaseResponse<Object> getHelloWorld(){
        String helloWorld = client.getHelloWorld();
        if(StrUtil.isBlank(helloWorld)){
            return ResultUtils.success("请求失败请重试");
        }
        return ResultUtils.success(helloWorld);
    }
}`,
    };
  },
  computed: {
    info() {
      return this.$vkbeautify.xml(this.userInfo);
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang='scss' scoped>
.tutorial {
  padding: 50px;
}

.introduction {
  display: flex;
}
.infoColor {
  background: rgb(218, 218, 218);
}
h2 {
  font-size: 24px;
  font-weight: bold;
  font-family: 'W03';
}
.door{
  margin: 0 ;
  font-size: 26px;
  margin-right: 20px;
  font-family: 'W04';
}
.first{
  width: 80%;
  margin-left: 50px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: 18px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.loader {
 --size: 20px;
 display: flex;
 gap: 0.6rem;
}

.box {
 width: var(--size);
 height: var(--size);
 background: #0270e1;
 animation: rotate 2s infinite;
}

.box:nth-child(2) {
 animation-delay: 0.25s;
}

.box:nth-child(3) {
 animation-delay: 0.5s;
}

@keyframes rotate {
 50% {
  transform: rotate(180deg)
 }
}
</style>