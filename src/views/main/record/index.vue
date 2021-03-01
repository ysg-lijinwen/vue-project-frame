<template>
  <div class="portrait">
    <!-- 统计（开票单位、项目名称、发票金额<含税和不含税>）、提交时间、接收时间、提交人、接收人 -->
    <div class="landscape top-layout">
      <div class="center-vertically top-note">
        默认查询当前月份的数据
      </div>
      <div class="take-up-rest horizontal-layer-right">
        <div class="center-vertically">
          选择：
          <!-- <el-button plain type="primary" size="mini">月份</el-button> -->
          <el-date-picker v-model="chooseMonth" :editable='false' type="month" format="yyyy 年 MM 月"
            value-format="yyyy-MM" placeholder="请选择月份" :clearable="false" size="mini"
            style="width: 150px;" @change="queryRecord">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="take-up-rest center-content">
      <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" ref="table1"
        :data="tableData" stripe tooltip-effect="dark" height="100%" style="width: auto; ">
        <el-table-column type="index" align="center" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="billingUnit" align="center" label="开票单位">
        </el-table-column>
        <el-table-column prop="projectName" align="center"
          :formatter="$formatter.handleProjcetNameEmpty" label="项目名称">
        </el-table-column>
        <el-table-column prop="taxIncludedAmount" align="center"
          :formatter="$formatter.getTaxIncludedAmountText" width="92" label="发票金额(含税)">
        </el-table-column>
        <el-table-column prop="unTaxIncludedAmount" align="center"
          :formatter="$formatter.getUnTaxIncludedAmountText" width="92" label="发票金额(不含税)">
        </el-table-column>
        <el-table-column prop="type" align="center" :formatter="$formatter.getTypeText" label="类型">
        </el-table-column>
        <el-table-column prop="submitter" align="center" width="80" label="提交人">
        </el-table-column>
        <el-table-column prop="receiver" align="center" width="80" label="接收人">
        </el-table-column>
        <el-table-column prop="submitTime" align="center" label="提交时间">
        </el-table-column>
        <el-table-column prop="receiveTime" align="center"
          :formatter="$formatter.handleReceiveTimeEmpty" label="接收时间">
        </el-table-column>
        <el-table-column prop="status" align="center" width="80"
          :formatter="$formatter.getStatusText" label="状态">
        </el-table-column>
        <el-table-column prop="returnReason" align="center"
          :formatter="$formatter.handleReturnReasonEmpty" label="退回理由">
        </el-table-column>
      </el-table>
    </div>
    <div class="landscape bottom-layout">
      <div class="take-up-rest horizontal-layer-right">
        <div class="center-vertically">
          <el-button type="primary" size="mini">导出Excel表</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import commonService from "../../../api/commonService";
import api from "../../../api/api";
import bisUtil from '../../../utils/bis-util'

let curDate = new Date();

let curYear = curDate.getFullYear();
let curMonth = curDate.getMonth() + 1;
curMonth = curMonth < 10 ? "0" + curMonth : curMonth;

export default {
  name: "record",
  components: {
  },
  data() {
    return {
      chooseMonth: curYear + "-" + curMonth,
      tableData: [
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        }, {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        }, {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        }, {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        }, {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-08T14:27:26",
          "id": 43,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-08T16:58:01",
          "receiver": "张天淼",
          "receiverId": "0116230368774889",
          "status": 1,
          "submitTime": "2020-05-08T14:27:26",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 99.98,
          "type": "10",
          "unTaxIncludedAmount": 120.33
        },
        {
          "billingDate": "2020-05-08",
          "billingUnit": "开利科技",
          "checkCode": "1231232212332",
          "code": "315353531234",
          "createTime": "2020-05-09T13:48:45",
          "id": 44,
          "number": "21345342",
          "projectName": "智慧辅警",
          "receiveTime": "2020-05-09T14:12:32",
          "receiver": "李金文",
          "receiverId": "22386942391172449029",
          "returnTime": "2020-05-09T14:12:47",
          "status": 2,
          "submitTime": "2020-05-09T13:48:45",
          "submitter": "张天淼",
          "submitterId": "0116230368774889",
          "taxIncludedAmount": 1199.98,
          "type": "10",
          "unTaxIncludedAmount": 130.33
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "你是使用docker安装软件的吗",
          "checkCode": "64242579383262150433",
          "code": "050001700212",
          "createTime": "2020-05-09T11:45:58",
          "id": 1258966414314590200,
          "number": "82456543",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:45:58",
          "submitter": "测试服",
          "submitterId": "1221211",
          "taxIncludedAmount": 228.99,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        },
        {
          "billingDate": "2020-02-12",
          "billingUnit": "京东创盟信息技术有限公司",
          "checkCode": "64242579383262150492",
          "code": "050001700211",
          "createTime": "2020-05-09T11:53:59",
          "id": 1258968431590264800,
          "number": "82456542",
          "projectName": "",
          "receiver": "陈登元",
          "receiverId": "02655326681939946524",
          "status": 0,
          "submitTime": "2020-05-09T11:53:59",
          "submitter": "李金文",
          "submitterId": "22386942391172449029",
          "taxIncludedAmount": 222.89,
          "type": "10",
          "unTaxIncludedAmount": 202.64
        }
      ],
    };
  },
  mounted() { 
    this.queryRecord(this.chooseMonth)
  },
  methods: {
    queryRecord(month) {
      console.log(month)
      console.log("获取记录");
      var that = this;
				const data = commonService
					.post(api.bis + 'record/listForMonth', month)
					.then(function(response) {
            console.log(JSON.stringify(response))
            if(response.code == '000000'){
              that.tableData = response.data
            }
					})
					.catch(function(error) {
						console.log(error)
					});
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.top-layout {
  padding: 10px;
  border-bottom: 1px #dadada solid;
  height: 40px;
}
.top-note {
  color: #ffa460;
}

.center-content {
  overflow: hidden;
  overflow-y: scroll;
  white-space: nowrap;
}

.center-content::-webkit-scrollbar {
  width: 0;
}

.bottom-layout {
  padding: 10px;
  height: 40px;
}
</style>
