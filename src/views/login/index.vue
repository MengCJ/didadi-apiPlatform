<template>
  <div class="login-container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="contest">
      <div class="image">
        <img src="@/assets/111.jpg" alt="" />
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">欢迎使用该系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" class="svg" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
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
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
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
        <div class="bottom">
          <el-checkbox size="medium ">记住密码</el-checkbox>
          <el-link type="primary">忘记密码？</el-link>
        </div>
        <div class="zhuce">没有账号？去<span>注册</span></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码的长度不能低于6位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "mengcj",
        password: "12345678",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
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
  top: 50px;
  left: 400px;
  .image {
    float: left;
    width: 499px;
    border-right: 1px solid #e7e7e7;
    img {
      width: 100%;
      // height: 50%;
      height: 700px;
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
    background-color: rgb(58, 98, 215);
  }
  .right {
    float: left;
    width: 70%;
    background-color: rgb(214, 233, 255);
    min-height: 100%;
  }
  .login-form {
    top: 50px;
    left: 700px;
    width: 520px;
    max-width: 100%;
    height: 700px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: white;
    float: left;
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
