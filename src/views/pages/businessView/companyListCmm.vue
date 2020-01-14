<template>
    <div>
        <el-card style="margin: 14px;">
            <div>
                <el-form ref="filters" :model="filters" label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="企业名称：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系电话：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-bottom: -8px">
                        <el-col :span="12">
                            <el-form-item label="企业地址：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="行业大类：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" style="display: flex;justify-content: flex-end;">

                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="handleSearch">搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>

        <el-table :data="companyList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="企业名称" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="create_time" label="建档日期" width="250" align='center'>
            </el-table-column>

            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button class="table-butn" size="mini" type="primary" plain
                               @click="tableOperate('edit', scope.row)">编辑
                    </el-button>
                    <el-button class="table-butn" size="mini" type="info" plain
                               @click="tableOperate('del', scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-floor" v-if="companyPage.count > companyPage.rows">

            <div >

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="companyPage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="companyPage.count">
                </el-pagination>
            </div>
        </div>

        <el-drawer
                title="修改企业"
                :visible.sync="editFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <company-form-cmm :formData="editForm" :closeSuper="()=>{editFormVisible = false}" :submitSuper="editSubmit"></company-form-cmm>
        </el-drawer>
    </div>
</template>

<script>
    import companyListCmmBus from './companyListCmmBus.js'

    export default companyListCmmBus

</script>
