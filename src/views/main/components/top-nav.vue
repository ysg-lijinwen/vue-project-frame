<template>
  <div class="top-layer" style="z-index:2;">
    <div class="account-info-container" id="accountInfoContainer">
      <div class="user-container Q-Zhong" tabindex>
        <div class="name-container Q-Zhong">
          <div class="name Q-Zhong" @click="clickOpr">
            <p>{{ user.userName }}</p>
            <img :class="isShowTopPop ? 'arrow-down' : 'arrow-right'" src="../../../assets/home/arrow-right.png" />
          </div>
          <div class="avatar Q-Zhong">
            <img src="../../../assets/logo.png" />
          </div>
        </div>
      </div>
      <div :class="isShowTopPop ? 'move-down' : 'move-up'" class="top-pop-container">
        <div v-if="isShowTopPop" class="top-pop-content-bg"></div>
        <div v-if="isShowTopPop" class="pop-content-list">
          <!-- <div v-on:click="changeAccountInfo">头像设置</div>
          <div v-on:click="changePassword">修改密码</div> -->
          <div v-on:click="logout">退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _public from "../../../api/public";
export default {
  name: "topNav",
  data() {
    return {
      user: {
        id: 0,
        userName: "",
        picture: "../../../assets/logo.png", //http://114.115.145.80:8888/group1/M00/00/0C/wKgAJF6L156ALnGeAMAusspUJ9Y594.jpg
        tel: "",
        deptId: 0,
        deptName: "",
        orgId: 0,
        orgName: "",
      },
      isShowTopPop: false,
    };
  },
  mounted() {
    this.userInfo();
    document.body.addEventListener(
      "click",
      (e) => {
        e = e ? e : window.event;
        var bbool = false;
        if (e.path != undefined) {
          for (var i = 0; i < e.path.length; i++) {
            if (e.path[i].id === "accountInfoContainer") {
              bbool = true;
              break;
            }
          }
          if (!bbool) {
            this.closeTopPopWindow();
          }
        }
      },
      false
    );
  },
  methods: {
    closeTopPopWindow() {
      this.isShowTopPop = false;
    },
    clickOpr() {
      this.isShowTopPop = !this.isShowTopPop;
      if (!this.isShowTopPop) {
        this.closeTopPopWindow();
      }
    },
    changeAccountInfo() {
      this.closeTopPopWindow();
      this.$emit("changeAccountInfo", this.user);
    },
    changePassword() {
      this.closeTopPopWindow();
      this.$emit("changePassword");
    },
    logout() {
      this.closeTopPopWindow();
      this.$emit("logout");
    },
    userInfo() {
      // _public.post("getUserInfo").then((res) => {
      //   if (res.code === "000000") {
      //     console.log(res.data);
      //     this.user = res.data;
      //     sessionStorage.setItem("orgName_XS", res.data.orgName);
      //     console.log(sessionStorage);
      //   }
      // });
    },
  },
};
</script>

<style>
.account-info-container {
  position: absolute;
  float: right;
  right: 20px;
}

.user-container {
  width: max-content;
  height: 60px;
  float: right;
  border: 0px;
}

.name-container {
  width: auto;
  height: 80%;
  float: left;
  /* z-index: 1; */
}

.name-container .name {
  cursor: pointer;
  width: auto;
  height: 40px;
  float: left;
}

.name p {
  font-size: 14px;
  float: left;
  width: max-content;
  margin-left: 5px;
  color: #ffffff;
  height: 25px;
  line-height: 25px;
}

.name img {
  float: left;
  margin-left: 5px;
  margin-right: 8px;
}

.name-container .avatar {
  width: 40px;
  height: 40px;
  border-radius: 30px;
  float: left;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.top-pop-container {
  z-index: 100;
  right: 157px;
  position: absolute;
}

.top-pop-content-bg {
  width: 135px;
  height: 16px;
  z-index: 1;
  position: fixed;
  margin-top: 56px;
  margin-left: 42px;
  background-image: url("../../../assets/home/bg-drop-down.png");
  background-repeat: no-repeat;
}

.pop-content-list {
  width: 112px;
  height: auto;
  margin-left: 52px;
  background-color: #ffffff;
  box-shadow: rgba(198, 198, 198, 0.8) 0 0 5px 0px;
  border-radius: 4px;
  border-top: 0px;
  position: fixed;
  margin-top: 72px;
}

.pop-content-list div {
  cursor: pointer;
  font-size: 14px;
  line-height: 35px;
  width: 100%;
  height: 35px;
}

.pop-content-list div:hover {
  background-color: #eaf0fe;
  font-size: 15px;
}

.pop-content-list div:nth-child(-n + 1) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.pop-content-list div:nth-last-child(-n + 1) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.el-hover:hover {
  /* !important可以解释为最高优先级 */
  background-color: #d6defa !important;
  color: #1d5d9d !important;
}

.top-layer {
  width: calc(100% - 64px);
  position: relative;
  margin-left: 64px;
  background-color: #063a6f;
  height: 60px;
}
</style>
