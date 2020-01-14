<template>
    <div>
        <el-card style="margin: 14px;">
            <div>
                <el-form ref="filters" :model="filters" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="用户名：" style="margin-bottom: 0 !important;">
                                <el-input v-model="filters.username"></el-input>
                            </el-form-item>

                        </el-col>

                        <el-col :span="18" style="display: flex;justify-content: space-between">
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="handleSearch">搜索
                            </el-button>
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="tableOperate('add')">创建管理员
                            </el-button>
                        </el-col>
                    </el-row>

                </el-form>
            </div>

        </el-card>

        <el-table :data="managerList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="200" align='center'>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="200" align='center'>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180" align='center'>
            </el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button class="table-butn" size="mini" type="primary" plain
                               @click="tableOperate('edit', scope.row)">编辑
                    </el-button>
                    <el-button class="table-butn" size="mini" type="warning" plain
                               @click="tableOperate('rest', scope.row)">重置密码
                    </el-button>
                    <el-button class="table-butn" size="mini" type="info" plain
                               @click="tableOperate('del', scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-floor" v-if="managerPage.count > managerPage.rows">

            <div >

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="managerPage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="managerPage.count">
                </el-pagination>
            </div>
        </div>

        <el-drawer
                title="创建管理员"
                :visible.sync="addFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <manager-form-cmm :formData="addForm" :closeSuper="()=>{addFormVisible = false}" :submitSuper="addFormSubmit"></manager-form-cmm>
        </el-drawer>

        <el-drawer
                title="修改管理员"
                :visible.sync="editFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <manager-form-cmm :formData="editForm" :closeSuper="()=>{editFormVisible = false}" :submitSuper="editFormSubmit"></manager-form-cmm>
        </el-drawer>
    </div>


</template>

<script>
    import manager_list_page_bus from './manager_list_page_bus.js'

    export default manager_list_page_bus

</script>
<style scoped>

</style>
