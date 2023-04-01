<template>
  <page-view>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple" />
        <h3>SQL语句


        </h3>
        <el-divider />
        <el-input
            v-model="sql"
            :rows="30"
            type="textarea"
            placeholder="请输入sql"
        />
      </el-col>
      <el-col :span="16"
        ><div class="grid-content ep-bg-purple" />
        <h3>SQL分析</h3>
        <el-divider />
        <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-click="handleClick"
        >
          <el-tab-pane label="SQL评估" name="1" v-model="explain">
              <iframe
                  :srcdoc="explain"
                  style="width: 100%; height: 80vh; border: 0"
              >
              </iframe>
          </el-tab-pane>
          <el-tab-pane label="SQL美化" name="2">
            <iframe
                :srcdoc="explain"
                style="width: 100%; height: 80vh; border: 0"
            >
            </iframe>
          </el-tab-pane>
          <el-tab-pane label="Role" name="3">
            <iframe
                :srcdoc="explain"
                style="width: 100%; height: 80vh; border: 0"
            >
            </iframe>
          </el-tab-pane>
          <el-tab-pane label="Task" name="4">
            <iframe
                :srcdoc="explain"
                style="width: 100%; height: 80vh; border: 0"
            >
            </iframe>
          </el-tab-pane>
        </el-tabs>
       </el-col>
    </el-row>
  </page-view>
</template>
<script  setup>



import { ref } from 'vue'
import {GreetSqlQuery} from "../../../wailsjs/go/service/App"

import {ElMessage} from "element-plus";
const sql = ref('')
const explain = ref('')

const activeName = ref('first')
const handleClick = (tab, event) => {
  tab = event.target.getAttribute('id')
  //请求
  const data = {
    sql : sql.value,
    type: tab.replace("tab-","")
  }

  if (sql.value == null || sql.value == "") {
    ElMessage.warning("请先输入SQL语句!")
  }
  console.log("request: ",data)
  GreetSqlQuery(JSON.stringify(data)).then((result) => {
    const data = JSON.parse(result)
    console.log("response: ",data)
    explain.value = data.data
  })
}

</script>