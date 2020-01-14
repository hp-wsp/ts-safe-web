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
                                       @click="tableOperate('add')">创建服务商
                            </el-button>
                        </el-col>
                    </el-row>

                </el-form>
            </div>

        </el-card>

        <el-table :data="channelList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="单位名称" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="contact" label="法人" width="100" align='center'>
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="180" align='center'>
            </el-table-column>
            <el-table-column prop="province" label="省份" width="100" align='center'>
            </el-table-column>
            <el-table-column prop="city" label="城市" width="100" align='center'>
            </el-table-column>

            <el-table-column prop="status" label="状态" width="120" align='center'>
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
                    <el-button v-if="scope.row.status != 'OPEN'" class="table-butn" size="mini" type="success"
                               plain
                               @click="tableOperate('open', scope.row)">启用
                    </el-button>
                    <el-button v-else class="table-butn" size="mini" type="warning" plain
                               @click="tableOperate('close', scope.row)">禁用
                    </el-button>
                    <el-button class="table-butn" size="mini" type="info" plain
                               @click="tableOperate('del', scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-floor" v-if="channelPage.count > channelPage.rows">

            <div >

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="channelPage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="channelPage.count">
                </el-pagination>
            </div>
        </div>

        <el-drawer
                title="创建服务商"
                :visible.sync="addFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <channel-form-cmm :formData="addForm" :closeSuper="()=>{addFormVisible = false}" :submitSuper="addFormSubmit"></channel-form-cmm>
        </el-drawer>

        <el-drawer
                title="修改服务商"
                :visible.sync="editFormVisible"
                direction="rtl"
                size="70%"
                :before-close="handleDrawerClose">
            <channel-form-cmm :formData="editForm" :closeSuper="()=>{editFormVisible = false}" :submitSuper="editFormSubmit"></channel-form-cmm>
        </el-drawer>
    </div>


</template>

<script>
    import channel_list_page_bus from './channel_list_page_bus.js'

    export default channel_list_page_bus

</script>
<style scoped>

</style>
