<template>
  <page-view>
    <div style="padding-bottom: 10px">
      <span>
         <el-button type="primary" @click="handleSelectFile">日志文件&nbsp;&nbsp;<el-icon><UploadFilled /></el-icon></el-button>
      </span>
      <span v-if="filePath !=''" style="padding-left: 10px;">
           <el-icon :size="15"><Document /></el-icon> {{filePath}}
      </span>
      <span  style="padding-left: 20px">
         <el-button type="primary" @click="handleNginxFile">分析</el-button>
      </span>
    </div>

    <el-divider />
    <div v-loading="loading" element-loading-text="数据加载中...">
      <div class="data-box" v-if="table1 !=''">
        <el-alert :title="table1Title" type="success" effect="dark" :closable="false" />
          <el-tabs type="border-card" >
            <el-tab-pane label="中国">
              <el-table  :data="table1" stripe  style="width: 100%" max-height="500" v-if="table1 !=''">
                <el-table-column prop="ip" label="IP" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="hits" label="访问次数" min-width="100" header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="location" label="归属" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="国外">
              <el-table  :data="table2" stripe  style="width: 100%" max-height="500" v-if="table2 !=''">
                <el-table-column prop="ip" label="IP" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="hits" label="访问次数" min-width="100" header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="location" label="归属" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未知">
              <el-table  :data="table3" stripe  style="width: 100%" max-height="500" v-if="table3 !=''">
                <el-table-column prop="ip" label="IP" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="hits" label="访问次数" min-width="100" header-align="center" align="center" show-overflow-tooltip />
                <el-table-column prop="location" label="归属" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              </el-table>
            </el-tab-pane>
          </el-tabs>
      </div>
      <br />
      <div class="data-box" v-if="table4 !=''">
        <el-alert title="URL访问统计" type="success" effect="dark" :closable="false" />
        <el-tabs type="border-card" >
          <el-tab-pane label="POST">
            <el-table  :data="table4" stripe  style="width: 100%" max-height="500" v-if="table4 !=''">
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="GET">
            <el-table  :data="table5" stripe  style="width: 100%" max-height="500" v-if="table5 !=''">
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="其他">
            <el-table  :data="table6" stripe  style="width: 100%" max-height="500" v-if="table6 !=''">
              <el-table-column prop="fun" label="请求方法" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <br/>

      <div class="data-box" v-if="table7 !=''">
        <el-alert title="状态码访问统计" type="success" effect="dark" :closable="false" />
        <el-tabs type="border-card" >
          <el-tab-pane label="200+">
            <el-table  :data="table7" stripe  style="width: 100%" max-height="500" v-if="table7 !=''">
              <el-table-column prop="status" label="状态码" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="fun" label="请求方法" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="300+">
            <el-table  :data="table8" stripe  style="width: 100%" max-height="500" v-if="table8 !=''">
              <el-table-column prop="status" label="状态码" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="fun" label="请求方法" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="400+">
            <el-table  :data="table9" stripe  style="width: 100%" max-height="500" v-if="table9 !=''">
              <el-table-column prop="status" label="状态码" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="fun" label="请求方法" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="500+">
            <el-table  :data="table10" stripe  style="width: 100%" max-height="500" v-if="table10 !=''">
              <el-table-column prop="status" label="状态码" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="fun" label="请求方法" min-width="50" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="url" label="URL" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
              <el-table-column prop="hits" label="访问次数" min-width="80" header-align="center" align="center" show-overflow-tooltip />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-divider />
  </page-view>
</template>


<style lang="css">
.el-popper{
  max-width:50% !important;
  line-height: 24px;
}
</style>


<script setup>
import { ref } from "vue";
import {SelectFile,GreetExplainNginx  } from "../../../wailsjs/go/service/App"
import { ElMessage, ElMessageBox  } from 'element-plus'
const filePath = ref("");
const loading = ref(false);

const table1 = ref("")
const table2 = ref("")
const table3 = ref("")
const table4 = ref("")
const table5 = ref("")
const table6 = ref("")
const table7 = ref("")
const table8 = ref("")
const table9 = ref("")
const table10 = ref("")

const table1Title = ref("")

const handleSelectFile = () => {
  SelectFile().then((path) => {
    console.log(`选择的文件路径为：${path}`);
    filePath.value = path;
  })
};

const handleNginxFile = () => {
  if (filePath.value == null || filePath.value == "") {
    ElMessage.warning({
      message: "请先选择日志文件!",
      center: true,
    })
    return
  }

  loading.value = true
  const data = {file: filePath.value}

  GreetExplainNginx(JSON.stringify(data)).then((result) => {
    var res = null;
    try {
      res = JSON.parse(result)
    } catch (e) {
      ElMessage.warning({
        message: "解析错误，请重新解析",
        center: true,
      })
      loading.value = false
      return
    }


    if (res[0] != undefined) {
      table1Title.value = "IP访问统计 " + " 【 PV：" +  res[0][0]["pv"] + " UV：" +  res[0][0]["uv"] + " 】"
    }

    var table1Tmp = [];
    var table2Tmp = [];
    var table3Tmp = [];
    if (res[1] != undefined) {
      var tmp = res[1]
      for (var key in tmp) {
        const json = {}
        json['ip'] = tmp[key]["ip"]
        json['location'] = tmp[key]["location"]
        json['hits'] = tmp[key]["hits"]
        if (tmp[key]["country"] == "1") {
          table1Tmp.push(json)
        } else if(tmp[key]["country"] == "2") {
          table2Tmp.push(json)
        } else {
          table3Tmp.push(json)
        }
      }
      table1.value = table1Tmp
      table2.value = table2Tmp
      table3.value = table3Tmp
    }

    var table4Tmp = [];
    var table5Tmp = [];
    var table6Tmp = [];
    if (res[2] != undefined) {
      var tmp2 = res[2]
      for (var key2 in tmp2) {
        const json2 = {}
        json2['url'] = tmp2[key2]["url"]
        json2['hits'] = tmp2[key2]["hits"]
        if (tmp2[key2]["fun"] == "POST") {
          table4Tmp.push(json2)
        } else if(tmp2[key2]["fun"] == "GET") {
          table5Tmp.push(json2)
        } else {
          json2['fun'] = tmp2[key2]["fun"]
          table6Tmp.push(json2)
        }
      }
      table4.value = table4Tmp
      table5.value = table5Tmp
      table6.value = table6Tmp
    }

    var table7Tmp = [];
    var table8Tmp = [];
    var table9Tmp = [];
    var table10Tmp = [];
    if (res[5] != undefined) {
      var tmp3 = res[5]
      for (var key3 in tmp3) {
        const json3 = {}
        json3['status'] = tmp3[key3]["status"]
        json3['fun'] = tmp3[key3]["fun"]
        json3['url'] = tmp3[key3]["url"]
        json3['hits'] = tmp3[key3]["hits"]
        if (parseInt(tmp3[key3]["status"]) >=200 && parseInt(tmp3[key3]["status"]) < 300) {
          table7Tmp.push(json3)
        } else if(parseInt(tmp3[key3]["status"]) >=300 && parseInt(tmp3[key3]["status"]) < 400) {
          table8Tmp.push(json3)
        } else if(parseInt(tmp3[key3]["status"]) >=400 && parseInt(tmp3[key3]["status"]) < 500) {
          table9Tmp.push(json3)
        }else if(parseInt(tmp3[key3]["status"]) >=500) {
          table10Tmp.push(json3)
        }
      }
      table7.value = table7Tmp
      table8.value = table8Tmp
      table9.value = table9Tmp
      table10.value = table10Tmp
    }

    loading.value = false
  })
};


</script>