<template>
  <div class="page">
    <div class="main">
      <header class="header">
        <topNav ref="topNav" @changeAccountInfo="changeAccountInfo" @changePassword="changePassword" @logout="logout" />
      </header>
      <leftNav @expandCallback="handleExpandRes" />
      <div class="content scroll-bar" :class="isInit ? 'init-content' : isExpandStatus ? 'zoom-out' : 'zoom-in'">
        <router-view class="content-box" />
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from "./components/left-nav";
import topNav from "./components/top-nav";
import { Message } from "element-ui";

import commonService from "../../api/commonService";
import { removeCache } from "../../storage/menuStorage";

export default {
  name: "index",
  components: {
    leftNav,
    topNav,
  },
  data() {
    return {
      isInit: false,//是否使用初始化设置
      isExpandStatus: true,//是否处于展开状态
    };
  },
  mounted() {},
  methods: {
    handleExpandRes(b) {
      this.isInit = false;
      this.isExpandStatus = b;
    },
    changeAccountInfo(e) {
      Message({
        message: "修改用户信息" + e.userName,
        type: "info",
      });
      this.$router.push({
        name: "test",
      });
    },
    changePassword() {
      Message({
        message: "修改密码",
        type: "info",
      });
    },
    logout() {
      // Message({
      //   message: "登出",
      //   type: "info",
      // });
      this.$confirm("确定退出当前用户吗?", "温馨小提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          commonService
            .post("/logout", {})
            .then(() => {
              this.$router.push("/"); //退出登录
              removeCache(); //清空缓存
            })
            .catch(() => {});
        })
        .catch(() => {
          //取消操作
        });
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.page {
  color: #2c3e50;
  display: flex;
  justify-content: center;
  background-color: #cbd5e4;
}

.main {
  width: 100%;
  height: 100vh;
  /* display: flex;
  flex-direction: column;
  position: relative; */

  .header {
    height: 60px;
    display: flex;
    flex-direction: row;
  }
}

.init-content {
  width: calc(100% - 64px);
  margin-left: 64px;
}

.content {
  height: calc(100% - 60px);
  float: left;
  background: #ecf5ff;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
  position: absolute;
}
.content-box {
  flex: 1;
  height: 100%;
  background: #ecf5ff;
  overflow: auto;
}

.zoom-in {
  animation: zoom-in 0.3s linear;
  animation-fill-mode: forwards;
  width: calc(100% - 60px);
}

.zoom-out {
  animation: zoom-out 0.3s linear;
  animation-fill-mode: forwards;
  width: calc(100% - 200px);
}

@keyframes zoom-in {
  from {
    width: calc(100% - 200px);
    margin-left: 200px;
  }

  to {
    width: calc(100% - 60px);
    margin-left: 60px;
  }
}

@keyframes zoom-out {
  from {
    width: calc(100% - 64px);
    margin-left: 64px;
  }

  to {
    width: calc(100% - 200px);
    margin-left: 200px;
  }
}
</style>
