<template>
    <div class="ind-all">
      <el-card class="ind-title">题目标题</el-card>
      <el-row
        :gutter="24">
        <el-col
          :span="12"
          :xs="{span:24}">
          <el-card
            class="margin-top-20 border-none box-shadow-none"
            style="position: relative;">
            <div slot="header">
              <h3 style="margin-bottom: 0px">各品类占比</h3>
            </div>
            <el-row style="height: 161px;">
              <el-col :span="8">
                <el-progress type="circle" :percentage="25" color="#67C23A" :stroke-width="10">
                  <div class="label-annotation">完成</div>
                  <div  style=" font-size: 16px;margin-top: 8px">28%</div>
                </el-progress>
              </el-col>
              <el-col :span="8">
                <el-progress
                  :percentage="22"
                  :stroke-width="10"
                  type="circle">
                  <div class="label-annotation">西餐</div>
                  <div class="font-16 margin-top-8">22%</div>
                </el-progress>
              </el-col>
              <el-col :span="8">
                <el-progress
                  :percentage="32"
                  :stroke-width="10"
                  type="circle">
                  <div class="label-annotation">火锅</div>
                  <div class="font-16 margin-top-8">32%</div>
                </el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col
          :span="6"
          :xs="{span:24}">
        </el-col>

        <el-col
          :span="6"
          :xs="{span:24}">
        </el-col>

      </el-row>
    </div>
</template>

<script>
  
</script>

<style lang="less">
  .ind-all{
    position: relative;
    background-color: #eee;
  }
  .ind-title{
    font-size: 30px;
  }
  .label-annotation {
    color: rgba(0,0,0,.45);
    font-style: normal;
  }
  .data_section {
    padding: 20px;
    margin-bottom: 40px;
    .section_title {
      text-align: center;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .data_list {
      text-align: center;
      font-size: 14px;
      color: #666;
      border-radius: 6px;
      background: #E5E9F2;
      .data_num {
        color: #333;
        font-size: 26px;

      }
      .head {
        border-radius: 6px;
        font-size: 22px;
        padding: 4px 0;
        color: #fff;
        display: inline-block;
      }
    }
    .today_head {
      background: #FF9800;
    }
    .all_head {
      background: #20A0FF;
    }
  }

</style>
