<template>
  <div class="Q-Zhong welcome-container">
    <div class="welcome-container-s">
      <div class="text-container">
        <a>WELCOME!</a>
        <p>欢迎进入发票管理系统</p>
      </div>
      <div class="welcome-img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
    };
  },
  created() {
  },
};
</script>

<style scoped>
.welcome-container {
  width: 100%;
  height: 100%;
}

.welcome-container-s {
  width: 100%;
  height: 550px;
}

.text-container {
  width: 100%;
  height: 200px;
}
.text-container a:nth-child(1) {
  height: 140px;
  line-height: 140px;
  font-size: 80px;
  color: #6995dc;
}
.text-container p:nth-child(2) {
  font-size: 20px;
  margin-top: -15px;
  color: #898a8f;
}

.welcome-img {
  width: 1100px;
  margin-left: calc(50% - 550px);
  height: 350px;
  background: url("../.././/../assets/home/welcome.png") no-repeat;
  background-size: 100% 100%;
}
</style>
