<template>
  <div style="width: 200px;height: calc(100% - 60px);float: left;">
    <div class="left-menu-header">
      <div class="meun-switch-left Q-Zhong">
        <span>
          <img :src="expandImg" @click="menuSwitch()" />
        </span>
        <p class="system-name">发票管理后台</p>
      </div>
    </div>
    <el-menu
      :collapse-transition="true"
      background-color="#0C355D"
      text-color="#ADC1EA"
      active-text-color="#00D4C3"
      class="left-menu"
      :collapse="!isExpand"
    >
      <div style="width: 100%" v-for="(firstLevelItem, i) in menuList" :key="i">
        <el-submenu class="firstLevel" style="text-align: left;" v-if="firstLevelItem.hasChildren" :index="firstLevelItem.id.toString()">
          <template slot="title">
            <span v-if="firstLevelItem.menuIco"
              ><img :id="firstLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + firstLevelItem.menuIco + '')"
            /></span>
            <span v-if="isExpand" slot="title">{{ firstLevelItem.menuName }}</span>
          </template>
          <div v-for="secondLevelItem in firstLevelItem.children" :key="secondLevelItem.id.toString()" :index="secondLevelItem.id.toString()">
            <el-submenu style="text-align: left;" v-if="secondLevelItem.hasChildren" :index="secondLevelItem.id.toString()">
              <template style="text-align: left;" slot="title">
                <span v-if="secondLevelItem.menuIco"
                  ><img :id="secondLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + secondLevelItem.menuIco + '')"
                /></span>
                <span>{{ secondLevelItem.menuName }}</span>
              </template>
              <div v-for="thirdLevelItem in secondLevelItem.children" :key="thirdLevelItem.id.toString()" :index="thirdLevelItem.id.toString()">
                <el-submenu style="text-align: left;" v-if="thirdLevelItem.hasChildren" :index="thirdLevelItem.id.toString()">
                  <template style="text-align: left;" slot="title">
                    <span v-if="thirdLevelItem.menuIco"
                      ><img :id="thirdLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + thirdLevelItem.menuIco + '')"
                    /></span>
                    <span>{{ thirdLevelItem.menuName }}</span>
                  </template>
                  <div v-for="fourthLevelItem in thirdLevelItem.children" :key="fourthLevelItem.id.toString()" :index="fourthLevelItem.id.toString()">
                    <el-menu-item :index="fourthLevelItem.id.toString()" @click="handleRouter(fourthLevelItem)">
                      <span v-if="fourthLevelItem.menuIco"
                        ><img :id="fourthLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + fourthLevelItem.menuIco + '')"
                      /></span>
                      <span>{{ fourthLevelItem.menuName }}</span>
                    </el-menu-item>
                  </div>
                </el-submenu>
                <el-menu-item v-else :index="thirdLevelItem.id.toString()" @click="handleRouter(thirdLevelItem)">
                  <span v-if="thirdLevelItem.menuIco"
                    ><img :id="thirdLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + thirdLevelItem.menuIco + '')"
                  /></span>
                  <span>{{ thirdLevelItem.menuName }}</span>
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item style="text-align: left;" v-else :index="secondLevelItem.id.toString()" @click="handleRouter(secondLevelItem)">
              <span v-if="secondLevelItem.menuIco"
                ><img :id="secondLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + secondLevelItem.menuIco + '')"
              /></span>
              <span>{{ secondLevelItem.menuName }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
        <el-menu-item style="text-align: left;" v-else :index="firstLevelItem.id.toString()" @click="handleRouter(firstLevelItem)">
          <span v-if="firstLevelItem.menuIco"
            ><img :id="firstLevelItem.id" class="menu-img" :src="require('../../../assets/home/menu/' + firstLevelItem.menuIco + '')"
          /></span>
          <span>{{ firstLevelItem.menuName }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { getMenuListFromCache } from "../../../storage/menuStorage";

export default {
  name: "leftNav",
  props: {
    modeName: {
      type: String,
      default: "fjgl",
    },
  },
  data() {
    return {
      menuList: [],
      isExpand: true,
      expandImg: require('../../../assets/home/menu/expand.png'),
      menuVo: {},
      isSwitch: false//是否可以开关
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    handleRouter(key) {
      console.log(key);
      if (key.menuIco != null) {
        var img_src = key.menuIco.split(".")[0] + "-f." + key.menuIco.split(".")[1];
        if (this.menuVo.id != undefined) {
          document.getElementById(this.menuVo.id).src = require("../../../assets/home/menu/" + this.menuVo.menuIco);
          document.getElementById(key.id).src = require("../../../assets/home/menu/" + img_src);
        } else {
          document.getElementById(key.id).src = require("../../../assets/home/menu/" + img_src);
        }
        this.menuVo = key;
      } else {
        if (this.menuVo.id != undefined) {
          document.getElementById(this.menuVo.id).src = require("../../../assets/home/menu/" + this.menuVo.menuIco);
        }
        this.menuVo = {};
      }
      this.$router.push(key.menuUri);
    },
    getMenuList() {
      this.menuList = getMenuListFromCache();
      this.$nextTick(() => {
        this.collapse();
      });
    },
    menuSwitch() {
      if(!isSwitch) return
      this.isExpand = !this.isExpand;
      console.log("-------menuSwitch----------" + this.isExpand);
      if (!this.isExpand) {
        this.expandImg = require("../../../assets/home/menu/expand.png");
        this.collapse();
      } else {
        this.expandImg = require("../../../assets/home/menu/collapse.png");
        var that = this;
        setTimeout(function() {
          that.handleRouter(that.menuVo);
        }, 400);
      }
      this.$emit("expandCallback", this.isExpand);
    },
    collapse() {
      setTimeout(function() {
        var tubiaojiantou = document.getElementsByClassName("firstLevel");
        tubiaojiantou.forEach(function(dom) {
          var d = dom.getElementsByTagName("i")[0];
          d.parentElement.removeChild(d);
        });
      }, 500);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 60px;
  min-height: 400px;
}

.ziji {
  padding: 0 60px !important;
}

.left-menu {
  width: 200px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none\0;
}

.left-menu::-webkit-scrollbar {
  display: none;
}

.left-menu-header {
  background: #063a6f;
  /* 063A6F */
  width: 64px;
  height: 60px;
  margin-top: -60px;
}

.meun-switch-left .span {
  width: 25px;
  height: 25px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
}

.meun-switch-left .span img {
  width: 100%;
  height: 100%;
}

.meun-switch-left {
  width: 64px;
  height: 60px;
}

.system-name {
  color: #ffffff;
  position: absolute;
  left: 60px;
  z-index: 3;
  font-weight: 600;
  font-size: 18px;
  height: 25px;
  line-height: 25px;
  height: 60px\0;
  line-height: 60px\0;
  margin-top: -30px\0;
}
</style>
