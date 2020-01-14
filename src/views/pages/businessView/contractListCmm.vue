<template>
    <div>
        <el-card style="margin: 14px;">
            <div>
                <el-form ref="filters" :model="filters" label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="委托单位：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单位形式：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目属地：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-bottom: -8px">
                        <el-col :span="12">
                            <el-form-item label="合同名称：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同编号：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" style="display: flex;justify-content: space-between;">
                            <el-checkbox v-model="checked" style="margin-top: 12px;margin-left: 6px">未关联服务</el-checkbox>
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="handleSearch">搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>

        <el-table :data="contractList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="code" label="合同编号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="合同名称" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="create_time" label="合同约定时间" width="300" align='center'>
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
        <div class="page-floor" v-if="contractPage.count > contractPage.rows">

            <div >

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="contractPage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="contractPage.count">
                </el-pagination>
            </div>
        </div>

        <el-drawer
                title="修改合同"
                :visible.sync="editFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <contract-form-cmm :formData="editForm" :closeSuper="()=>{editFormVisible = false}" :submitSuper="editSubmit"></contract-form-cmm>
        </el-drawer>
    </div>
</template>

<script>
    import contractListCmmBus from './contractListCmmBus.js'

    export default contractListCmmBus

</script>
