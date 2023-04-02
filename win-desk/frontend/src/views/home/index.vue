<template>
  <div style="margin:8px;">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never" style="margin-bottom: 15px">
          <div class="welTop">
            <div class="icon">
              <el-avatar :size="60" :src="avatar"></el-avatar>
            </div>
            <div class="main">
              <h2>欢迎使用 {{config.title}}</h2>
              <p>
                基于Redis、Mysql、Nginx工具
              </p>
              <p>
                <el-link href="https://github.com/Alke-meng/wails-project" target="_blank" type="success">
                  如果对您有帮助，欢迎 <el-icon><StarFilled /></el-icon> Star https://github.com/Alke-meng/wails-project
                </el-link>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>

import config from "@/config";
import aitePng from '@/assets/images/aite.png'

const avatar = aitePng


</script>

<style  scoped>
.el-tag+.el-tag {
  margin-left: 10px;
}

.welTop {
  display: flex;
}

.welTop .main {
  margin-left: 20px;
}

.welTop .main h2 {
  font-size: 20px;
  color: #3c4a54;
}

.welTop .main p {
  color: #999;
  margin-top: 10px;
  line-height: 1.8;
}

.welTop .icons {
  margin-left: auto;
  text-align: center;
}

.welTop .icons p {
  font-size: 12px;
}

.avatar-list .avatar {
  margin-left: -10px;
  border: 3px solid #fff;
  cursor: pointer;
}

.data-box .el-card {
  margin-bottom: 15px;
}

.data-box .item-background {
  background: #409eff;
  color: #fff;
}

.data-box .item-background .item h2 {
  color: #fff;
}

.data-box .item-background .item p {
  color: rgba(255, 255, 255, 0.5);
}

.data-box .item-background .item .icon i {
  background: rgba(255, 255, 255, 0.2);
}

.data-box .item {
  display: flex;
}

.data-box .item h2 {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

.data-box .item h4 {
  font-size: 25px;
  margin: 5px 0 5px 0;
}

.data-box .item p {
  font-size: 12px;
  color: #999;
}

.data-box .item .icon {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.data-box .item .icon i {
  font-size: 18px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-box .item p span.up {
  color: #f56c6c;
}

.data-box .item p span.down {
  color: #67c23a;
}
</style>
