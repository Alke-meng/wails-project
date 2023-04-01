<template>
  <page-view>
    <h2>
      <span style="padding-right: 30px">SQL语句</span>
      <el-button-group class="ml-4">
        <el-button type="primary" @click="explainSql">执行计划</el-button>
        <el-button type="primary" @click="execSql">执行详细</el-button>
        <el-button type="primary" @click="clearSql">清空</el-button>
      </el-button-group>
    </h2>
    <div style="margin-bottom: 10px;cursor: pointer">
      <el-alert title="sql语句中表名前要带上所在的数据库" type="warning" :closable="false" show-icon/>
    </div>
    <div>
      <el-input
          v-model="sql"
          :rows="5"
          type="textarea"
          placeholder="请输入sql"
      />
    </div>

    <el-tabs style="height: 100%" class="demo-tabs" v-model="activeName">
      <el-tab-pane label="执行计划" name="first">
        <div v-if="explain !=''">
          <iframe
              :srcdoc="explain"
              style="width: 100%; height: 100vh; border: 0;margin-top: -20px;"
          >
          </iframe>
        </div>
      </el-tab-pane>
      <el-tab-pane label="执行详细" name="second">
        <div>
          <el-alert :title="tableTitle" type="success" effect="dark" :closable="false" v-if="tableTitle !=''"/>
          <el-table :row-class-name="tableRowClassName" :data="tableData" stripe  style="width: 100%" v-if="tableData !=''">
            <el-table-column prop="status" label="状态" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
            <el-table-column prop="duration" label="时间(s)" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
            <el-table-column prop="cpuUser" label="cpuUser(s)" min-width="100" header-align="center" align="center" show-overflow-tooltip />
            <el-table-column prop="cpuSys" label="cpuSys(s)" min-width="100" header-align="center" align="center" show-overflow-tooltip />
            <el-table-column prop="proportion" label="占比(%)" min-width="100" header-align="center" align="center" show-overflow-tooltip />
            <el-table-column prop="function" label="function" min-width="100" header-align="center" align="center" show-overflow-tooltip />
          </el-table>

          <el-divider v-if="json1 !=''" />

          <el-alert title="语句执行详细过程" type="success" effect="dark" :closable="false" v-if="json1 !=''"/>
          <el-tabs type="border-card" v-if="json1 !=''">
            <el-tab-pane label="准备阶段">
              <JsonViewer :value="json1" expanded :expand-depth=50 boxed></JsonViewer>
            </el-tab-pane>
            <el-tab-pane label="优化阶段">
              <JsonViewer :value="json2"  expanded :expand-depth=50  boxed></JsonViewer>
            </el-tab-pane>
            <el-tab-pane label="执行阶段">
              <JsonViewer :value="json3" expanded :expand-depth=50  boxed></JsonViewer>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </page-view>
</template>

<style lang="css" scoped>
/deep/ .el-table .warning-row td{
  background:#F8ECDA !important;
  color:red
}

/deep/ .el-table .success-row td{
  background:#F8ECDA !important;
  background: #f0f9eb;
}
</style>

<script setup>

import { ref } from 'vue'
import {GreetSqlQuery,GreetSqlExec} from "../../../wailsjs/go/service/App"
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
import {ElMessage} from "element-plus";
import { getToken } from "../../utils/auth";

const sql = ref('')
const explain = ref('')
const loading = ref(false);
const activeName = ref('first')
const tableData = ref("");
const tableTitle = ref("");
const json1 = ref("");
const json2 = ref("");
const json3 = ref("");

var total = 0.000000
var max = 0
const tableRowClassName = ({row, rowIndex}) => {
  if (rowIndex === parseInt(max)) {
    return 'success-row'
  }
  return ''
}

const clearSql = () => {
  sql.value = explain.value = ''
}

const execSql = () => {
  const data = {sql : sql.value,token: getToken()}

  if (sql.value == null || sql.value == "") {
    ElMessage.warning({
      message: "请先输入SQL语句!",
      center: true,
    })
    return
  }

  loading.value = true

  console.log("request: ",data)
  GreetSqlExec(JSON.stringify(data)).then((result) => {
    const data = JSON.parse(result)
    if (data.code == "2") {
      ElMessage.warning({
        message: "分析日志错误，原因：" + data.msg,
        center: true,
      })
      loading.value = false
      return
    }
    console.log("response: ",data)
    var table1 = []
    var maxTmp = 0.000000
    if (typeof data.data.detail != "undefined") {
        for (var item in data.data.detail) {
          total += parseFloat(data.data.detail[item][1])
        }

        for (var key in data.data.detail) {
          const json = {}
          json['status'] = data.data.detail[key][0]
          json['duration'] = data.data.detail[key][1]
          json['cpuUser'] = data.data.detail[key][2]
          json['cpuSys'] = data.data.detail[key][3]
          json['proportion'] = ((parseFloat(data.data.detail[key][1])/parseFloat(total))*100).toFixed(2)
          json['function'] = data.data.detail[key][4]
          table1.push(json)
          if (parseFloat(data.data.detail[key][1]) > parseFloat(maxTmp)) {
            max = key
            maxTmp = parseFloat(data.data.detail[key][1])
          }
        }
        table1.push({
          'status': "总计",
          'duration': total.toFixed(6),
          'cpuUser': "-",
          'cpuSys': "-",
          'proportion': "100",
          'function': "-",
        })

        tableTitle.value = "查询详细耗时过程，总耗时：" + total.toFixed(6) + " 秒"
        tableData.value = table1
    }

    if (data.data.explain != undefined) {
      var strTmp = JSON.parse(data.data.explain[0][0])
      json1.value = strTmp['steps'][0]
      json2.value = strTmp['steps'][1]
      json3.value = strTmp['steps'][2]
    }

    loading.value = false
    activeName.value = "second"
  })
}

const explainSql = () => {
  const data = {sql : sql.value,token: getToken()}

  if (sql.value == null || sql.value == "") {
    ElMessage.warning({
      message: "请先输入SQL语句!",
      center: true,
    })
    return
  }

  loading.value = true

  console.log("request: ",data)
  GreetSqlQuery(JSON.stringify(data)).then((result) => {
    const data = JSON.parse(result)
    if (data.code == "2") {
      ElMessage.warning({
        message: "分析日志错误，原因：" + data.msg,
        center: true,
      })
      loading.value = false
      return
    }
    console.log("response: ",data)
    explain.value = data.data
    loading.value = false
    activeName.value = "first"
  })
}

</script>

