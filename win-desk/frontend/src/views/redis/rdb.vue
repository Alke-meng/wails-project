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
         <el-button type="primary" @click="handleRdbFile">分析</el-button>
      </span>
    </div>

    <el-divider />
    <div v-loading="loading" element-loading-text="数据加载中...">
      <div class="data-box" v-if="totalNumber !=''">
        <el-row :gutter="15">
          <el-col :md="12" :xs="24">
            <el-card shadow="never" class="item-background">
              <template #header>
                <div class="card-header" style="text-align: center"><span>key数量占比</span></div>
              </template>
              <div id="chartA" style="max-height: 300px;height: 300px"></div>
            </el-card>
          </el-col>

          <el-col :md="12" :xs="24">
            <el-card shadow="never" class="item-background">
              <template #header>
                <div class="card-header" style="text-align: center"><span>key空间占比</span></div>
              </template>
              <div id="chartB" style="max-height: 300px;height: 300px"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <br/>
      <div class="data-box" v-if="tableData !=''">
        <el-card shadow="never" class="item-background">
          <el-alert :title="tableTitle" type="success" effect="dark" :closable="false" />
          <el-table :data="tableData" stripe  style="width: 100%">
            <el-table-column prop="Key" label="键名" header-align="center" align="center" />
            <el-table-column prop="Type" label="类型"  header-align="center" align="center" />
            <el-table-column prop="Bytes" label="大小"  header-align="center" align="center" />
            <el-table-column prop="NumOfElem" label="元素数量" header-align="center" align="center" />
            <el-table-column prop="LenOfLargestElem" label="最大长度的元素"  header-align="center" align="center" />
            <el-table-column prop="FieldOfLargestElem" label="最大长度的字段" header-align="center" align="center" />
          </el-table>
          <br/>
          <el-pagination
              v-if="tableDataAll !=''"
              layout="total,sizes,prev, pager, next"
              :total="tableDataAll.length"
              :page-size="pageSize"
              @current-change="currentChange"
              @size-change="handleSizeChange"
              :page-sizes="[10, 20, 50, 100]"
              :current-page="currentPage"
          ></el-pagination>
        </el-card>
      </div>

      <br/>
      <div class="data-box" v-if="tableData2 !=''">
        <el-card shadow="never" class="item-background">
          <el-alert title="key前缀统计" type="success" effect="dark" :closable="false" />
          <el-button style="margin-top: 10px;margin-bottom: 10px" v-for="item in dataType" @click="handleSelectType(item)">{{ item }}</el-button>
          <el-table :data="tableData2" stripe  style="width: 100%" max-height="600">
            <el-table-column prop="Key" label="键名" header-align="center" align="center" />
            <el-table-column prop="Type" label="类型" header-align="center" align="center" />
            <el-table-column prop="Bytes" label="大小"  header-align="center" align="center" />
            <el-table-column prop="Num" label="数量" header-align="center" align="center" />
          </el-table>
        </el-card>
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
import { ref,nextTick   } from "vue";
import {SelectFile,GreetExplainRdb } from "../../../wailsjs/go/service/App"
import { ElMessage, ElMessageBox  } from 'element-plus'
import { changeSize,changeTime,compareData } from '@/utils';

import * as echarts from 'echarts';

const filePath = ref("");
const loading = ref(false);
const totalNumber = ref("");
const tableDataAll = ref("");
const tableData = computed(() => {
  let result = tableDataAll.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
  )
  return result
})
const pageSize = ref(10)
const currentPage = ref(1)
const tableData2 = ref("")
const dataType = ref("")
const tableTitle = ref("")

var selectType = 'hash'
var table2DataAll = {}

//实现方法：
const currentChange = (e) => {
  currentPage.value = e
}
const handleSizeChange = (val) => {
  console.log(val)
  currentPage.value = 1
  pageSize.value = val
}

const handleSelectFile = () => {
  SelectFile("","*.rdb").then((path) => {
    console.log(`选择的文件路径为：${path}`);
    filePath.value = path;
  })
};

const handleSelectType = (item) => {
  tableData2.value = table2DataAll[item]
};

const initEchartsA=(option)=> {
  const myChart = echarts.init(document.getElementById("chartA"));
  myChart.setOption(option);
  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    myChart.resize();
  });
  return { initEchartsA };
}

const initEchartsB=(option)=> {
  const myChart = echarts.init(document.getElementById("chartB"));
  myChart.setOption(option);
  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    myChart.resize();
  });
  return { initEchartsB };
}

const handleRdbFile = () => {
  if (filePath.value == null || filePath.value == "") {
    ElMessage.warning({
      message: "请先选择日志文件!",
      center: true,
    })
    return
  }

  loading.value = true
  const data = {file: filePath.value}

  GreetExplainRdb(JSON.stringify(data)).then((result) => {
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

    const data = res[0]
    let dataA = []
    let stringA = ""
    for (let i in data['TypeNum']) {
      let jsonA = {}
      jsonA['value'] = data['TypeNum'][i]
      jsonA['name'] = i
      stringA += i + ": " + data['TypeNum'][i] + "    "
      dataA.push(jsonA)
    }

    totalNumber.value = data['TotleNum']

    // 基本柱状图
    var optionA = {
      tooltip: {
        trigger: 'item'
      },
      title: [{
        text: '总数:' + data['TotleNum'],
        left: 'center'
      },
      {
        subtext: stringA,
        left: 'center',
        top: '90%',
      }],
      legend: {
        orient: 'vertical',
        top: '1%',
        left: 'left'
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: ['30%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dataA
        }
      ]
    };

    let dataB = []
    let stringB = ""
    for (let i in data['TypeBytes']) {
      let jsonB = {}
      jsonB['value'] = data['TypeBytes'][i]
      jsonB['name'] = i
      stringB += i + ": " + changeSize(data['TypeBytes'][i]) + "    "
      dataB.push(jsonB)
    }

    // 基本柱状图
    var optionB = {
      tooltip: {
        trigger: 'item'
      },
      title: [{
        text: '大小:' + changeSize(data['TotleBytes']),
        left: 'center'
      },
      {
        subtext: stringB,
        left: 'center',
        top: '90%',
      }],
      legend: {
        orient: 'vertical',
        top: '1%',
        left: 'left'
      },
      series: [
        {
          name: '大小',
          type: 'pie',
          radius: ['30%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dataB
        }
      ]
    };

    var tableTmp = []
    var jsonC = {}
    for (var key in data['LargestKeys']) {
      data['LargestKeys'][key]['Bytes'] = changeSize(data['LargestKeys'][key]['Bytes'])
      tableTmp.push(data['LargestKeys'][key])
      let jsonKey = data['LargestKeys'][key]['Type'];
      if (jsonC.hasOwnProperty(jsonKey) == true) {
        jsonC[jsonKey] += 1
      } else {
        jsonC[jsonKey] = 1
      }
    }

    var tableTitleTmp = "排名前100的key  ( "
    for (var k in jsonC) {
      tableTitleTmp += k + ": " + jsonC[k] + "个 "
    }
    tableTitleTmp += ")"

    tableTitle.value = tableTitleTmp

    tableDataAll.value = tableTmp

    var dataTypeTmp = []
    for (var key2 in data['LargestKeyPrefixes']) {
      let tableTmp2 = []
      dataTypeTmp.push(key2)
      for (var key3 in data['LargestKeyPrefixes'][key2]) {
        data['LargestKeyPrefixes'][key2][key3]['Bytes'] = changeSize(data['LargestKeyPrefixes'][key2][key3]['Bytes'])
        tableTmp2.push(data['LargestKeyPrefixes'][key2][key3])
      }
      table2DataAll[key2] = tableTmp2
    }

    dataType.value = dataTypeTmp
    tableData2.value = table2DataAll[selectType]

    nextTick(() => {
      setTimeout(() => {initEchartsA(optionA)},500)
      setTimeout(() => {initEchartsB(optionB)},500)

    })

    loading.value = false
  })
};


</script>