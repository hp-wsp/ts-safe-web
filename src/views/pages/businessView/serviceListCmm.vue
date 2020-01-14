<template>
    <div>
        <el-card style="margin: 14px;">
            <div>
                <el-form ref="filters" :model="filters" label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="9">
                            <el-form-item label="服务企业：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="服务状态：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="服务名称：">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="display: flex;justify-content: end;">
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="handleSearch">搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>

        <el-table :data="serviceList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="服务名称" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="create_time" label="服务时间" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="status" label="服务状态" width="250" align='center'>
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 'OPEN'" style="color:#67C23A">已启用</span>
                    <span v-else-if="scope.row.status === 'WAIT'" style="color:#f5a71b">待启用</span>
                    <span v-else style="color:#F56C6C">已禁用</span>
                </template>
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
        <div class="page-floor" v-if="servicePage.count > servicePage.rows">

            <div >

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="servicePage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="servicePage.count">
                </el-pagination>
            </div>
        </div>
        <el-drawer
                title="修改服务"
                :visible.sync="editFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <service-form-cmm :formData="editForm" :editId="editId" :closeSuper="()=>{editFormVisible = false}" :submitSuper="editSubmit"></service-form-cmm>
        </el-drawer>
    </div>
</template>

<script>
    import serviceListCmmBus from './serviceListCmmBus.js'

    export default serviceListCmmBus

</script>
