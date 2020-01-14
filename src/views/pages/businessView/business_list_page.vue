<template>
    <div>

        <div style="display: flex;justify-content: space-between;background: #ffffff;height: 60px;line-height: 60px;font-size: 16px;font-weight: bold">
            <div style="display: flex">
                <div class="wxmenu" :class="(wmenu==='companyMenu')?'wxmenu_active':''"
                     @click="gotoMenu('companyMenu')">
                    企业管理
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

        <company-list-cmm v-if="wmenu==='companyMenu'"></company-list-cmm>
        <contract-list-cmm v-else-if="wmenu==='contractMenu'"></contract-list-cmm>
        <service-list-cmm v-else-if="wmenu==='serviceMenu'"></service-list-cmm>

        <el-drawer
                title="新增企业"
                :visible.sync="addCompanyFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <company-form-cmm :formData="addCompanyForm" :closeSuper="()=>{addCompanyFormVisible = false}" :submitSuper="addCompanyFormSubmit"></company-form-cmm>
        </el-drawer>

        <el-drawer
                title="新增合同"
                :visible.sync="addContractFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <contract-form-cmm :formData="addContractForm" :closeSuper="()=>{addContractFormVisible = false}" :submitSuper="addContractFormSubmit"></contract-form-cmm>
        </el-drawer>

        <el-drawer
                title="新增服务"
                :visible.sync="addServiceFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <service-form-cmm :formData="addServiceForm" :closeSuper="()=>{addServiceFormVisible = false}" :submitSuper="addServiceFormSubmit"></service-form-cmm>
        </el-drawer>
    </div>
</template>

<script>
    import business_list_page_bus from './business_list_page_bus.js'

    export default business_list_page_bus

</script>
<style scoped>

</style>
