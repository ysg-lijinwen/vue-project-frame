<template>
  <div>
    <div class="login-bg">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="0px" class="login-box">
        <div class="login-title-info">
          <p>XXXX后台管理系统</p>
          <p>XXXX backstage management system</p>
        </div>
        <div class="login-container">
          <div class="login-row-container">
            <el-form-item label prop="account" style="margin-bottom: 32px;">
              <el-input class="login-input" type="text" placeholder="请输入账号" v-model="form.account" maxlength="20" clearable>
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
          </div>
          <div class="login-row-container">
            <el-form-item label prop="password" style="margin-bottom: 32px;">
              <el-input class="login-input" type="password" placeholder="请输入密码" v-model="form.password" maxlength="20" show-password>
                <i slot="prefix" class="el-input__icon el-icon-warning"></i>
              </el-input>
            </el-form-item>
          </div>
          <div class="login-row-container">
            <el-form-item>
              <el-button class="login-btn" type="primary" id="loginBtn" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import commonService from "../../api/commonService";
import api from "../../api/api";
import cusMenu from "../../mock/cusMenu";
import { removeCache, setMenuListCache, setPermButtonCache } from "../../storage/menuStorage";

export default {
  name: "Login",
  data() {
    return {
      //用于更换Input中的图标
      icon: "el-input__icon el-icon-view",
      form: {
        account: "",
        password: "",
        // account: "11011011011",
        // password: "011011",
        verificationCode: "",
        code: "验证码",
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        account: [
          {
            required: true,
            message: "账号不可为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不可为空",
            trigger: "blur",
          },
        ],
      },
      dlgNote: "请输入账号、密码和验证码",
    };
  },
  mounted() {
    removeCache();
    document.onkeydown = function(e) {
      e = e ? e : window.event;
      if (e.keyCode == 13) {
        document.getElementById("loginBtn").click();
      }
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    login() {
      console.log(this.form.account);
      console.log(this.form.password);
      var that = this;

      setMenuListCache(cusMenu.data().data.menuList);
      setPermButtonCache(cusMenu.data().data.permButtonList);

      that.$router.push("/index");
      // this.getUserMenu()
      
      // commonService
      //   .post(api.common + "login", {
      //     account: this.form.account,
      //     password: this.form.password,
      //     flag: 1, //民警标识
      //   })
      //   .then(function() {
      //     that.getUserMenu();
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    getUserMenu() {
      var that = this;
      //getPermMenuAndButtonList getMenuButtonByUser
      commonService.post(api.user + "getMenuButtonByUser").then(function(response) {
        console.log(response.data.menuList);
        console.log(response.data.permButtonList);
        setMenuListCache(response.data.menuList);
        setPermButtonCache(response.data.permButtonList);
        that.$router.push("/index");
      });
    },

    getVerificationCode() {
      this.form.code = this.getRandomInt(1000, 9999);
      console.log(this.form.code);
    },

    //生成随机数
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.login-bg {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  // background-image: url(../../assets/login.png);
  // background-repeat: no-repeat;
  // background-color: #1160af;
  background-image: linear-gradient(#91c3e5, #1160af);
  background-size: 100% 100%;
  position: relative;
}

.login-btn {
  width: 100% !important;
  background: linear-gradient(180deg, #3f91e4, #1160af) !important;
  border-radius: 5px !important;
  border: 0px !important;
}

.login-container {
  width: 420px;
  height: 268px;
}
.login-row-container {
  width: 350px;
  padding: 0 35px;
  height: 72px;
}
.login-container .login-row-container:nth-child(1) {
  padding-top: 35px;
}
.login-container .login-row-container:nth-child(3) {
  padding-top: 12px;
}

.login-box {
  border: 1px solid #dcdfe6;
  width: 420px;
  height: 268px;
  margin: 306px 300px auto auto;
  /* padding: 35px 35px 15px 35px; */
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  background-color: #ffffff;
  position: relative;
}

.el-form-item__content .login-input {
  /* background-color: #ebebeb !important; */
}

.login-title-info {
  width: 100%;
  height: 90px;
  /* background-color: #096; */
  margin-top: -115px;
  /* margin-left: 35px; */
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
}

.login-title-info p:nth-child(1) {
  width: 550px;
  height: 50px;
  line-height: 50px;
  font-size: 42px;
  letter-spacing: 6px;
  color: #ffffff;
}

.login-title-info p:nth-child(2) {
  width: 550px;
  height: 40px;
  color: #ffffff;
  line-height: 26px;
  font-size: 16px;
}
</style>
