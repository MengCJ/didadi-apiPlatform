<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <span class="name">1111</span> -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="
              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' +
              '?imageView2/1/w/80/h/80'
            "
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="open"> 我的 </el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog  title="我的中心" :visible.sync="dialogFormVisible">
      <el-form :model="userInfo">
        <el-form-item label="昵 * 称" :label-width="formLabelWidth">
          <el-input
            v-model="userInfo.userAccount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="secretKey" :label-width="formLabelWidth">
          <el-input disabled v-model="userInfo.secretKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="accessKey" :label-width="formLabelWidth">
          <el-input disabled v-model="userInfo.accessKey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  data() {
    return {
      dialogFormVisible: false,
      userInfo: "",
      formLabelWidth: "120px",
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "id"]),
  },
  methods: {
    async open() {
      this.dialogFormVisible = true;
      const res = await this.$Api.getUser(this.id);
      if (res.code == "20000") {
        this.userInfo = res.data;
      }
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      const result = await this.$store.dispatch("user/logout");
      if (result == "ok") {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    // .name{
    //   width: 30px;
    //   display: inline-block;
    //   background-color: red;
    //   height: 100%;
    // line-height: 50px;
    // }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
