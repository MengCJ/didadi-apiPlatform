<template>
  <div class="login-container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="contest">
      <div class="image">
        <div class="title">
          <h3>滴答滴API开放平台</h3>
        </div>
        <div class="img"><img src="@/assets/loginimg.png" /></div>
        <!-- <img src="@/assets/111.jpg" alt="" /> -->
      </div>
      <div class="context_erapper">
        <div class="dengluOrZhuce">
          <div
            :class="[show ? 'active' : '']"
            @click="showLgion"
            style="flex-grow: 1; border-right: 1px solid #ddd"
          >
            登录
          </div>
          <div
            :class="[!show ? 'active' : '']"
            @click="showRegister"
            style="flex-grow: 1"
          >
            注册
          </div>
        </div>
        <div v-if="show">
          <el-form
            ref="register"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" class="svg" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="账号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" class="svg" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 30px"
              @click.native.prevent="handleLogin"
              >立即登录</el-button
            >
          
          </el-form>
        </div>
        <div v-else>
          <div>
            <el-form
              ref="loginForm"
              :model="register"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" class="svg" />
                </span>
                <el-input
                  ref="username"
                  v-model="register.username"
                  placeholder="用户账户"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" class="svg" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="register.password"
                  :type="passwordType"
                  placeholder="用户密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>
              <el-form-item prop="checkPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" class="svg" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="register.checkPassword"
                  :type="passwordType"
                  placeholder="确定密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>
              <el-button
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleRegister"
                >立即注册</el-button
              >
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("用户名不能低于6位"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error("密码的长度不能低于8位数"));
      } else {
        callback();
      }
    };
    const validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        password: "",
        checkPassword: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        checkPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateCheckPassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      show: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 注册
    async handleRegister(){
      const {username,password,checkPassword} = this.register
      const res =await this.$Api.userRegister({userAccount:username,userPassword:password,checkPassword:checkPassword})
     if(res.code=='20000'){
      this.$message({
        type:'success',
        message:'注册成功'
      })
      // this.show = !this.show
     }
    },
    showLgion() {
      this.show = !this.show;
      this.$refs.loginForm.resetFields();
    },
    showRegister() {
      this.show = !this.show;
      this.$refs.register.resetFields();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async handleLogin() {
      const reuslt = await this.$store.dispatch("user/logins", this.loginForm);
      if (reuslt === "ok") {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        this.$router.push({ path: this.redirect || "/" });
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 15px 0;
}
.zhuce {
  font-size: 14px;
  // font-weight: bold;
  margin-top: 20px;
  padding-left: 15px;
  span {
    color: #3a62d7;
    cursor: pointer;
  }
}
.svg {
  fill: currentColor;
  color: gray;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      color: black;
      caret-color: #000;
      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }
  .el-button {
    border-radius: 100px;
  }
  .el-form-item {
    border: 1px solid #e7e7e7;
    // background: rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 30px;
    color: #454545;
  }
}
</style>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.contest {
  width: 1020px;
  z-index: 999;
  // background-color: red;
  position: absolute;
  top: 100px;
  left: 350px;
  .image {
    float: left;
    width: 400px;
    border-right: 1px solid #e7e7e7;
    background: #fcefe8;
    height: 550px;
    position: relative;
    .title {
      font-size: 26px;
      color: rgb(58, 98, 215);
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      font-family: "W03";
    }
    .img {
      position: absolute;
      top: 100px;
      left: 60px;
      width: 300px;
      img {
        width: 100%;
      }
    }
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background-color: $bg;
  overflow: hidden;
  // background: url("/assets/404_images/SHS2.jpg");
  // background-repeat: no-repeat;
  // background-size: 10%;
  .left {
    float: left;
    width: 30%;
    min-height: 100%;
    position: relative;
    background-color: #1685a9;
  }
  .right {
    float: left;
    width: 70%;
    background-color: #f0fcff;
    min-height: 100%;
  }
  .context_erapper {
    width: 600px;
    max-width: 100%;
    height: 550px;
    padding: 50px 35px 0;
    margin: 0 auto;
    background-color: white;
    float: left;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;

    .dengluOrZhuce {
      width: 60%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 50px;
      position: absolute;
      top: 50px;
      line-height: 40px;
      text-align: center;
      font-family: "W04";
      font-size: 20px;
      border: 1px solid #ddd;
      cursor: pointer;

      .active {
        border-top: 2px solid #ddd;
        border-top-color: #1685a9;
      }
    }
  }
  .login-form {
    width: 350px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: rgb(58, 98, 215);
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      position: absolute;
      top: -100px;
      left: 50px;
    }
    .titles {
      font-size: 26px;
      color: rgb(58, 98, 215);
      text-align: center;
      font-weight: bold;
      position: absolute;
      top: -100px;
      left: 120px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
