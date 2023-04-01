<template>
  <page-view>
    <div style="padding-bottom: 10px">
      <span>
         <el-button type="primary" @click="handleSelectFile">日志文件&nbsp;&nbsp;<el-icon><UploadFilled /></el-icon></el-button>
      </span>
      <span v-if="filePath !=''" style="padding-left: 10px;">
           <el-icon :size="15"><Document /></el-icon> {{filePath}}
      </span>
    </div>
    <div style="margin-bottom: 10px;cursor: pointer" @click="handleDownload">
      <el-alert title="若无法解析，请点击下载安装环境" type="warning" :closable="false" show-icon/>
    </div>

    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
    <el-form-item label="最近时间">
      <el-input v-model="lastHour" type="number" min="0" max="100">
        <template #append>小时</template>
      </el-input>
    </el-form-item>

      <el-form-item label="时间区域">
        <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        />
      </el-form-item>

    <el-form-item>
      <el-button-group class="ml-4">
        <el-button type="primary" @click="explainSlow">解析</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-button-group>
    </el-form-item>
    </el-form>
    <el-tag size="small">温馨提示：【最近时间】【时间区域】优先【最近时间】</el-tag>
    <el-divider />
    <div v-loading="loading" element-loading-text="数据加载中...">
      <el-alert :title="tableTitle" type="success" effect="dark" :closable="false" v-if="tableTitle !=''"/>
      <el-table :data="tableData" stripe  style="width: 100%" v-if="tableData !=''">
        <el-table-column prop="attribute" label="属性" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="total" label="总计" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="min" label="最小值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="max" label="最大值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="avg" label="平均值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="95" label="95%" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="stddev" label="标准差" min-width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="median" label="中位数" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      </el-table>
    <el-divider />
      <el-alert title="查询分组统计结果" type="success" effect="dark" :closable="false" v-if="tableTitle !=''" />
      <el-table :data="tableData2" stripe  style="width: 100%" v-if="tableData2 !=''">
        <el-table-column  fixed prop="rank" label="排名" width="50" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="response" label="响应时间" width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="time" label="时间占比" width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="calls" label="执行次数" width="100" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="avg" label="平均响应时间" width="110" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="fingerprint" label="SQL指纹" width="300" header-align="center" align="center" show-overflow-tooltip />
        <el-table-column prop="sql"  width="300" label="SQL样例" header-align="center" align="center">
          <template #default="scope">
          <el-popover trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{ scope.row.sql }}</div>
            </template>
            <template #reference>
              <div><el-tag style="">{{ scope.row.sql }}</el-tag></div>
            </template>
          </el-popover>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作"  width="200px">
          <template #default="scope">
            <el-button size="small" @click="handleViewDetail(scope.$index, scope.row)">详细</el-button>
            <el-button size="small" @click="handleCopySql(scope.$index, scope.row)">复制</el-button>
            <el-button size="small" @click="handleExplainSql(scope.$index, scope.row)">分析</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
  </page-view>

  <el-dialog v-model="dialogTableVisible" title="详细信息" width="70%">
    <el-button-group class="ml-4">
      <el-button type="primary" @click="formatSql">格式化</el-button>
      <el-button type="primary" @click="StringSql">平铺</el-button>
    </el-button-group>
    <highlightjs style="white-space:pre-wrap;max-height: 500px;overflow-y: scroll;" language='sql' :code="msgSql" />
    <el-divider />
    <el-table :data="gridData">
      <el-table-column prop="attribute" label="属性" min-width="100" fixed header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="total" label="总计" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="min" label="最小值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="max" label="最大值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="avg" label="平均值" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="95" label="95%" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="stddev" label="标准差" min-width="100" header-align="center" align="center" show-overflow-tooltip />
      <el-table-column prop="median" label="中位数" min-width="100" header-align="center" align="center" show-overflow-tooltip />
    </el-table>
    <div id="hostParam" style="max-height: 300px;height: 300px"></div>
  </el-dialog>

  <el-dialog v-model="dialogExplainVisible" title="SQL语句报告">
    <div>
      <iframe
          :srcdoc="explain"
          style="width: 100%; height: 80vh; border: 0;margin-top: -20px;"
      >
      </iframe>
    </div>
  </el-dialog>

</template>


<style lang="css">
.el-popper{
  max-width:50% !important;
  line-height: 24px;
}
</style>


<script setup>
import { ref,nextTick   } from "vue";
import {SelectFile,GreetExplainSlow,GreetSqlQuery} from "../../../wailsjs/go/service/App"
import { ElMessage, ElMessageBox  } from 'element-plus'
import { changeSize,changeTime,compareData } from '@/utils';
import {copyText} from "vue3-clipboard";
import * as echarts from 'echarts';
import { format } from 'sql-formatter';
import { getToken } from "../../utils/auth";

const filePath = ref("");
const lastHour = ref("");
const tableData = ref("");
const timeRange = ref("");
const filterSql = ref("");
const tableTitle = ref("");
const loading = ref(false);
const tableDataAll = ref("");
const explain = ref("");
const dialogTableVisible = ref(false)
const dialogExplainVisible= ref(false)
const gridData = ref("");
const msgSql= ref("");

var msgSqlText = ""

const tableData2 = computed(() => {
  let result = tableDataAll.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
  )
  return result
})

const handleDownload = () => {
    const url = "https://pan.baidu.com/s/1qzhAPVHJqLR9TVHD2s9UVw?pwd=qke3";
    window.open(url, '_blank')
}

const pageSize = ref(10)
const currentPage = ref(1)
//实现方法：
const currentChange = (e) => {
  currentPage.value = e
}
const handleSizeChange = (val) => {
  currentPage.value = 1
  pageSize.value = val
}

const handleSelectFile = () => {
  SelectFile("").then((path) => {
    console.log(`选择的文件路径为：${path}`);
    filePath.value = path;
  })
};

const handleExplainSql= (index,row) => {
  loading.value = true
  const data = {sql : row.sql,token: getToken()}
  console.log("request: ",data)
  GreetSqlQuery(JSON.stringify(data)).then((result) => {
    const data = JSON.parse(result)
    console.log("response: ",data)
    explain.value = data.data
    dialogExplainVisible.value = true
    loading.value = false
  })
};

const handleViewDetail= (index,row) => {
  console.log(index,row)
  const table3 = [];
  const tmp = {
    'Query_time':"执行时间",
    'Lock_time':"锁占用时间",
    'Query_length':"查询的字符数",
    'Rows_examined':"扫描的语句行数",
    'Rows_sent':"发送到客户端的行数",
  }
  for (var key in tmp) {
    const json = {}
    json['attribute'] = tmp[key]
    if (key == 'Query_time' || key == 'Lock_time') {
      json['total'] = changeTime(row.metrics[key]['sum'])
      json['min'] = changeTime(row.metrics[key]['min'])
      json['max'] = changeTime(row.metrics[key]['max'])
      json['avg'] = changeTime(row.metrics[key]['avg'])
      json['95'] = changeTime(row.metrics[key]['pct_95'])
      json['stddev'] = changeTime(row.metrics[key]['stddev'])
      json['median'] = changeTime(row.metrics[key]['median'])
    } else {
      json['total'] = changeSize(row.metrics[key]['sum'])
      json['min'] = changeSize(row.metrics[key]['min'])
      json['max'] = changeSize(row.metrics[key]['max'])
      json['avg'] = changeSize(row.metrics[key]['avg'])
      json['95'] = changeSize(row.metrics[key]['pct_95'])
      json['stddev'] = changeSize(row.metrics[key]['stddev'])
      json['median'] = changeSize(row.metrics[key]['median'])
    }
    table3.push(json)
  }

  // 基本柱状图
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ["1us","10us","100us","1ms","10ms","100ms","1s","10s+"],
      axisTick: {alignWithLabel: true}
    },
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '次数',
        type: "bar", //形状为柱状图
        barWidth: '60%',
        data: row.histograms.Query_time
      }
    ]
  };

  nextTick(() => {
    setTimeout(() => {initEcharts(option)},500)

  })

  msgSqlText = row.sql;
  msgSql.value = row.sql;

  gridData.value = table3
  dialogTableVisible.value = true
};

const formatSql = () => {
  msgSql.value = format(msgSqlText, { language: 'mysql' }).replace(/\\r\\n/g, '<br/>')
}

const StringSql = () => {
  msgSql.value = msgSqlText
}

const initEcharts=(option)=> {
  const myChart = echarts.init(document.getElementById("hostParam"));
  myChart.setOption(option);
  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    myChart.resize();
  });
  return { initEcharts };
}

const handleCopySql= (index,row) => {
  copyText(row.sql, undefined, error => {
    if (error) {
      ElMessage.warning(`复制失败: ${error} ！`)
    } else {
      ElMessage.success(`复制成功！`)
    }
  })
};

const explainSlow = () => {
  if (filePath.value == null || filePath.value == "") {
    ElMessage.warning({
      message: "请先选择日志文件!",
      center: true,
    })
    return
  }

  loading.value = true

  const data = {
    file: filePath.value,
    lastHour: lastHour.value,
    timeRange: timeRange.value,
    sqlType: filterSql.value
  }

  GreetExplainSlow(JSON.stringify(data)).then((result) => {
    console.log(result)
    if (result == "" || result == null) {
      tableTitle.value = ""
      tableData.value = ""
      tableDataAll.value = ""
      ElMessage.warning({
        message: "此条件内查询无数据",
        center: true,
      })
      loading.value = false
      return
    }

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

    const table1 = [];
    const table2 = [];
    let tableTitle1 = ""
    let ts_max = ""
    let ts_min = ""
    if (typeof res.global != "undefined") {
      if (typeof res.global.metrics != "undefined") {
        const tmp = {
          'Query_time':"执行时间",
          'Lock_time':"锁占用时间",
          'Query_length':"查询的字符数",
          'Rows_examined':"扫描的语句行数",
          'Rows_sent':"发送到客户端的行数",
        }
        for (var key in tmp) {
          const json = {}
          json['attribute'] = tmp[key]
          if (key == 'Query_time' || key == 'Lock_time') {
            json['total'] = changeTime(res.global.metrics[key]['sum'])
            json['min'] = changeTime(res.global.metrics[key]['min'])
            json['max'] = changeTime(res.global.metrics[key]['max'])
            json['avg'] = changeTime(res.global.metrics[key]['avg'])
            json['95'] = changeTime(res.global.metrics[key]['pct_95'])
            json['stddev'] = changeTime(res.global.metrics[key]['stddev'])
            json['median'] = changeTime(res.global.metrics[key]['median'])
          } else {
            json['total'] = changeSize(res.global.metrics[key]['sum'])
            json['min'] = changeSize(res.global.metrics[key]['min'])
            json['max'] = changeSize(res.global.metrics[key]['max'])
            json['avg'] = changeSize(res.global.metrics[key]['avg'])
            json['95'] = changeSize(res.global.metrics[key]['pct_95'])
            json['stddev'] = changeSize(res.global.metrics[key]['stddev'])
            json['median'] = changeSize(res.global.metrics[key]['median'])
          }
          table1.push(json)
        }
        tableTitle1 = "语句总数量：" + res.global['query_count'] + " 唯一的语句数量：" + res.global['unique_query_count']
      }
    }

    if (typeof res.classes != "undefined") {
      let totalTime = 0;
      for (let j = 0; j < res.classes.length; j++) {
        totalTime = parseFloat(totalTime) + parseFloat(res.classes[j]['metrics']['Query_time']['sum'])
      }
      for (let i = 0; i < res.classes.length; i++) {
        const json = {}
        if (ts_min != "") {
          ts_min = compareData(ts_min,res.classes[i]['ts_min'],"min")
        } else {
          ts_min =res.classes[i]['ts_min']
        }
        if (ts_max != "") {
          ts_max = compareData(ts_max,res.classes[i]['ts_max'],"max")
        } else {
          ts_max =res.classes[i]['ts_max']
        }
        json['rank'] = i +1
        json['response'] = parseFloat(res.classes[i]['metrics']['Query_time']['sum']).toFixed(2) +"s"
        json['calls'] = res.classes[i]['query_count']
        json['time'] = (res.classes[i]['metrics']['Query_time']['sum']*100/totalTime).toFixed(1) + "%";
        json['avg'] =  parseFloat(res.classes[i]['metrics']['Query_time']['avg']).toFixed(2)+"s"
        json['fingerprint'] = res.classes[i]['fingerprint']
        json['sql'] = res.classes[i]['example']['query']
        json['metrics'] = res.classes[i]['metrics']
        json['histograms'] = res.classes[i]['histograms']
        table2.push(json)
      }
      tableTitle1 += " 日志记录时间范围：" + ts_min + " 至 " + ts_max
    }

    tableTitle.value = tableTitle1
    tableData.value = table1
    tableDataAll.value = table2

    loading.value = false
  })
};

const reset = () => {
  lastHour.value = ""
  tableTitle.value = ""
  tableData.value = ""
  tableDataAll.value = ""
};

</script>