<!-- // 上传文件，默认不限制格式 -->
<template>
  <div class="upload-layer">
    <div v-if="acceptType != ''" class="upload-type-note">
      (支持类型：{{ $commonUtil.replaceAll(acceptType, ",", "/") }}
      )
    </div>
    <el-upload
      ref="upload"
      :accept="acceptType"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :show-file-list="listBool"
      :http-request="submitUpload"
      :auto-upload="autoUpload"
    >
      <template v-if="isShowDefBtn()">
        <div class="vertical-center upload-btn">
          <img src="@/assets/common/ic-upload-blue.png" />
          <font>上传文件</font>
        </div>
      </template>
      <slot />
    </el-upload>
  </div>
</template>

<script>
import commonService from "../../../../api/commonService";
export default {
  props: {
    single: {
      type: Boolean,
      default: true,
    },
    listBool: {
      //是否显示已上传文件列表
      type: Boolean,
      default: false,
    },
    //支持文件类型（如：.png），多个用英文逗号隔开
    acceptType: {
      type: String,
      default: "",
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  mounted() {},
  methods: {
    isShowDefBtn() {
      //   console.log(this.$slots); //scopedSlots
      return !this.$scopedSlots.default;
    },
    handleRemove(file) {
      // console.log('fileList：' + this.fileList[0].url)
      // console.log('file：' + file.url)
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url == file.url) {
          this.fileList.splice(i, 1);
          break;
        }
      }
      this.$emit("removeFile", file.url); //回调移除的地址
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload(file) {
      let _self = this;
      console.log("开始上传。。。。。");
      commonService.upload(file.file).then((res) => {
        if (res.code === "000000") {
          var fileVo = {
            fileName: file.file.name,
            fileStorage: res.data.url,
            fileType: file.file.type,
          };
          if (this.single) {
            this.fileList = [];
          }
          this.fileList.push({
            name: fileVo.fileName,
            url: fileVo.fileStorage,
          });
          _self.$emit("uploadSuccess", fileVo);
          this.$message({
            showClose: false,
            message: fileVo.fileName + "上传成功",
            type: "success",
          });
        } else {
          this.fileList = [];
          _self.$message({
            message: "文件上传异常，请重试！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style>
.upload-layer {
  text-align: start;
  padding: 8px;
}

.upload-type-note {
  color: #999999;
  font-size: 15px;
  margin-bottom: 5px;
}

.upload-btn {
  border: 0.5px #1160af solid;
  padding: 5px;
}

.upload-btn img {
  width: 18px;
  height: 18px;
}

.upload-btn font {
  color: #1160af;
  margin-left: 2px;
}
</style>
