<template>
  <div>
    测试页面
    <uploadPicture @uploadSuccess="uploadSuccess" @removeFile="removeFile" acceptType=".jpg,.png,.jpeg" :listBool="false"> </uploadPicture>
    <uploadExcel @uploadSuccess="uploadSuccess" @removeFile="removeFile" :listBool="false">
      <div class="upload-btn vertical-center">
        <img style="width: 18px; height: 18px;" src="../../../assets/common/ic-upload-blue.png" />
        <font style="color: #1160AF; margin-left: 2px;">上传工资表</font>
      </div>
    </uploadExcel>
    <uploadFile @uploadSuccess="uploadSuccess" @removeFile="removeFile" :single="false" :listBool="true"> </uploadFile>
  </div>
</template>

<script>
import uploadPicture from "../components/file-operating/uploadPicture";
import uploadExcel from "../components/file-operating/uploadExcel";
import uploadFile from "../components/file-operating/uploadFile";

export default {
  name: "index",
  components: {
    uploadPicture,
    uploadExcel,
    uploadFile,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    uploadSuccess(fileObj) {
      //   this.biaodan.firstStep.excelFile = []; //只有一张表，每次都是最新的。
      //   this.biaodan.firstStep.excelFile.push(fileObj);
      console.log(fileObj.fileName + "上传成功");
    },
    removeFile(i) {
      //   this.biaodan.firstStep.excelFile.splice(i, 1);
      console.log("删除" + i);
      this.$message({
        showClose: false,
        message: "删除成功",
        type: "success",
      });
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.upload-btn {
  border: 0.5px #1160af solid;
  padding: 5px;
  color: #1160af;
  padding: 5px;
}
</style>
