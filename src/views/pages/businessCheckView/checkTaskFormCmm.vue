<template>
    <div style="padding: 12px">
        <el-form :model="formData" label-width="120px" ref="formData">
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form-item label="服务名称：" prop="serviceId">
                        <el-select v-model="formData.serviceId" placeholder="服务名称" @change="handleServiceInfo">
                            <el-option
                                    v-for="item in serviceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="检查日期范围：" prop="contact">
                        <data-picker-cmm :wxStartData.sync="formData.checkTimeFrom"
                                         :wxEndData.sync="formData.checkTimeTo"></data-picker-cmm>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form-item label="检查人员：" prop="checkUserIds">
                        <el-select v-model="formData.checkUserIds" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in managerList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="选择检查表：" prop="checkSupIds">
                        <el-select v-model="formData.checkSupIds" multiple placeholder="选择检查表" style="width: 100%">
                            <el-option
                                    v-for="item in indCtgOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <div style="margin: 12px 0"><span>1、基础类检查</span></div>
            <el-table
                    :data="checkTypeList[0].items"
                    border
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                                :data="props.row.checkTableSelect"
                                :show-header="false"
                                :row-class-name="tableRowClassName"
                                border
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    align="center"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="conDetail">
                            </el-table-column>
                            <el-table-column
                                    width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger" plain
                                               @click="handleDelCheckItem(scope.row,scope.$index,props.$index)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">

                </el-table-column>
                <el-table-column
                        label="种类名称"
                        align="left"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="对应检查项及法规"
                        align="left"
                        prop="desc">
                    <template slot-scope="scope">
                        <div style="color: #4c7beb;cursor: pointer"
                             @click="handleSelectCheckItem(scope.row.id,scope.$index,1)">选择检查项
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin: 12px 0"><span>2、现场类检查</span></div>
            <el-table
                    :data="checkTypeList[1].items"
                    border
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">

                        <el-table
                                :data="props.row.checkTableSelect"
                                :show-header="false"
                                :row-class-name="tableRowClassName"
                                border
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    align="center"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="conDetail"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger" plain @click="handleDelCheckItem(scope)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">

                </el-table-column>
                <el-table-column
                        label="种类名称"
                        align="left"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="对应检查项及法规"
                        align="left"
                        prop="desc">
                    <template slot-scope="scope">
                        <div style="color: #4c7beb;cursor: pointer"
                             @click="handleSelectCheckItem(scope.row.id,scope.$index,2)">选择检查项
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin: 12px 0"><span>3、自行查找并添加到检查表</span></div>


        </el-form>
        <div class="dialog-footer">
            <el-button @click.native="closeOpt">取消</el-button>
            <el-button type="primary" @click.native="submitOpt">提交</el-button>
        </div>

        <el-dialog title="查看检查项" :visible.sync="checkTableDialogVisible" :modal="false" width="60%">
            <el-table :data="checkTableList" border ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column property="conDetail" align="center" label="检查内容明细"></el-table-column>
                <el-table-column property="content" align="center" label="法规内容"></el-table-column>
                <el-table-column property="lawItem" align="center" label="来源检查表名称"></el-table-column>
            </el-table>
            <div class="dialog-footer">
                <el-button @click.native="checkTableDialogVisible=false">取消</el-button>
                <el-button type="primary" @click.native="handleSelectSubmitOpt">提交</el-button>
            </div>
        </el-dialog>


        <el-dialog title="新增检查内容" :visible.sync="addCheckContentDialogVisible" :modal="false" width="60%">
            <el-form :model="addCheckContentForm" label-width="120px" ref="formData">
                <el-form-item label="检查内容：" prop="profile">
                    <el-input v-model="addCheckContentForm.content" type="textarea"
                              :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入检查内容"></el-input>
                </el-form-item>

                <el-form-item label="检查内容明细：" prop="profile">
                    <el-input v-model="addCheckContentForm.conDetail" type="textarea"
                              :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入检查内容明细"></el-input>
                </el-form-item>

                <el-form-item label="检查依据：" prop="profile">
                    <el-input v-model="addCheckContentForm.lawItem" type="textarea"
                              :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入检查依据"></el-input>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import global from '@/utils/globalHelper';
    import DataPickerCmm from '@/components/DataPickerCmm';

    export default {
        name: 'checkTaskFormCmm',
        data() {
            return {
                indCtgOptions: [],
                checkTableList: [],
                checkTypeIndex: 0,
                editCheckTableIndex: 0,
                checkTableDialogVisible: false,
                multipleSelection: [],
                formDataCheckSupIds: [],
                addCheckContentDialogVisible:false,
                addCheckContentForm:{}
            }
        },
        props: {
            formData: {
                type: Object,
                default: {}
            },
            submitSuper: {
                type: Function,
                default: null
            },
            closeSuper: {
                type: Function,
                default: null
            }
        },
        computed: {
            ...mapGetters([
                'serviceList', 'managerList', 'checkTypeList'
            ])
        },
        components: {
            DataPickerCmm
        },
        mounted() {
            this.$store.dispatch('getServiceList', {page: 0, rows: 10000});
            this.$store.dispatch('getManagerList', {page: 0, rows: 10000});

        },
        methods: {
            handleDelCheckItem: function (obj, index, preIndex) {

                this.checkTypeList[this.checkTypeIndex - 1].items[preIndex].checkTableSelect.splice(index, 1);
                let supIdIndex = this.formDataCheckSupIds.indexOf(obj.id);
                if (supIdIndex > -1) {
                    this.formDataCheckSupIds.splice(supIdIndex, 1);
                }

            },
            handleSelectSubmitOpt: function () {
                let that = this;
                this.multipleSelection.forEach(function (item) {
                    that.formDataCheckSupIds.push(item.id);
                });
                this.checkTypeList[this.checkTypeIndex - 1].items[this.editCheckTableIndex].checkTableSelect = [...this.multipleSelection];

                this.checkTableDialogVisible = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectCheckItem: function (id, index, typeIndex) {
                this.checkTypeIndex = typeIndex;
                this.editCheckTableIndex = index;
                this.$store.dispatch('getCheckTableList', {itemId: id}).then((res) => {

                    this.checkTableDialogVisible = true;
                    this.multipleSelection = [];
                    this.checkTableList = res;
                });
            },
            handleServiceInfo: function (value) {
                let that = this;
                this.serviceList.forEach(function (item) {
                    if (value == item.id) {
                        that.$store.dispatch('getCompanyInfo', {id: item.compId}).then((res) => {
                            if (res.indCtgs.length > 0) {
                                that.indCtgOptions = [...res.indCtgs];

                            }

                        });
                    }
                })

            },
            tableRowClassName({row, rowIndex}) {
                return 'success-row';
            },
            closeOpt: function () {
                if (typeof this.closeSuper == 'function') {
                    this.closeSuper();
                }
            },
            submitOpt() {
                global.formValidate(this, 'formData').then((valid) => {
                    if (valid && typeof this.submitSuper == 'function') {
                        let requestData = Object.assign({}, this.formData);

                        this.submitSuper(requestData);
                    }
                });
            }
        }
    }
</script>

<style>
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

<style scoped>

    .dialog-footer {
        position: relative;
        width: 160px;
        margin: 50px auto 0;
        display: flex;
        justify-content: space-between;
    }


</style>
