<template>
    <div>

        <div style="display: flex;justify-content: space-between;background: #ffffff;height: 60px;line-height: 60px;font-size: 16px;font-weight: bold">
            <div style="display: flex">
                <div class="wxmenu" :class="(wmenu==='checkTaskMenu')?'wxmenu_active':''"
                     @click="gotoMenu('checkTaskMenu')">
                    检查任务管理
                </div>
                <div class="wxmenu" :class="(wmenu==='contractMenu')?'wxmenu_active':''"
                     @click="gotoMenu('contractMenu')">
                    合同管理
                </div>
                <div class="wxmenu" :class="(wmenu==='serviceMenu')?'wxmenu_active':''"
                     @click="gotoMenu('serviceMenu')">
                    服务管理
                </div>
            </div>
            <div style="margin-right: 12px">
                <el-button type="success" style="margin-right: 8px;display: none"
                           @click="tableOperate('add')">导出合同
                </el-button>
                <el-button type="primary" icon="el-icon-plus" style="background: #5f8eff;margin-left: 18px"
                           @click="tableOperate('add')">{{optName}}
                </el-button>

            </div>
        </div>

        <checkTask-list-cmm v-if="wmenu==='checkTaskMenu'"></checkTask-list-cmm>


        <el-drawer
                title="新增检查任务"
                :visible.sync="addCheckTaskFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <checkTask-form-cmm :formData="addCheckTaskForm" :closeSuper="()=>{addCheckTaskFormVisible = false}" :submitSuper="addCheckTaskFormSubmit"></checkTask-form-cmm>
        </el-drawer>


    </div>
</template>

<script>
    import business_check_list_page_bus from './business_check_list_page_bus.js'

    export default business_check_list_page_bus

</script>
<style scoped>

</style>
