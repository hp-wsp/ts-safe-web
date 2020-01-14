<template>
    <div>
        <el-card style="margin: 14px;">
            <div>
                <el-form ref="filters" :model="filters" label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="行业名称：" style="margin-bottom: 0 !important;">
                                <el-input v-model="filters.name"></el-input>
                            </el-form-item>

                        </el-col>

                        <el-col :span="18" style="display: flex;justify-content: space-between">
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="handleSearch">搜索
                            </el-button>
                            <el-button type="primary" style="width: 120px;background: #5f8eff;margin-left: 18px"
                                       @click="tableOperate('add')">创建特种行业
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>

        <el-card style="margin: 14px;" v-if="addFormVisible">
            <div slot="header" class="clearfix">
                <span>创建特种行业</span>
            </div>
            <el-form :model="addForm" label-width="120px" ref="addForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="行业名称：" prop="name">
                            <el-input v-model="addForm.name" placeholder="请输入行业名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="remark">
                            <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-button @click="addFormVisible = false">取消</el-button>
                        <el-button type="primary" @click.native="addFormSubmit">提交</el-button>
                    </el-col>
                </el-row>

            </el-form>

        </el-card>

        <el-card style="margin: 14px;" v-if="editFormVisible">
            <div slot="header" class="clearfix">
                <span>修改特种行业</span>
            </div>
            <el-form :model="editForm" label-width="120px" ref="editForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="行业名称：" prop="name">
                            <el-input v-model="editForm.name" placeholder="请输入行业名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="remark">
                            <el-input v-model="editForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-button @click="editFormVisible = false">取消</el-button>
                        <el-button type="primary" @click.native="editFormSubmit">提交</el-button>
                    </el-col>
                </el-row>

            </el-form>

        </el-card>

        <el-table :data="speIndustryList" class="wxtable" stripe>
            <el-table-column
                    type="index"
                    label="序号" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="行业名称" width="250" align='center'>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="250" align='center'>
            </el-table-column>

            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button class="table-butn" size="mini" type="primary" plain
                               @click="tableOperate('edit',scope.row)">编辑
                    </el-button>
                    <el-button class="table-butn" size="mini" type="info" plain
                               @click="tableOperate('del', scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-floor" v-if="speIndustryPage.count > speIndustryPage.rows">

            <div>

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="speIndustryPage.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="speIndustryPage.count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import speIndustryListCmmBus from './speIndustryListCmmBus.js'

    export default speIndustryListCmmBus

</script>
<style scoped>

</style>
