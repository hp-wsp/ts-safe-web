<template>
    <div style="padding: 12px">
        <el-form :model="formData" label-width="140px" ref="formData">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="服务名称：" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入服务名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同名称：" prop="name">
                        <el-select v-model="formData.conId" placeholder="合同" style="width: 100%">
                            <el-option
                                    v-for="item in contractList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-form-item label="负责人：" prop="checkUserIds">
                <el-select v-model="formData.leaId" placeholder="请选择" style="width: 100%">
                    <el-option
                            v-for="item in managerList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>


            <div style="padding:12px 38px">
                <div>选择服务:
                    (选择服务选项采用,若选择请说明服务要求)：
                </div>
                <div class="table_reference_class" style="margin-top: 12px">
                    <div class="tr_reference_class" style="border-top: 1px solid #d4d4d4;">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[0].isCheck">{{checkedItems[0].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <div style="display: flex;line-height: 40px">
                                <div style="width: 100px"><span>创标等级: </span></div>
                                <el-input v-model="checkedItems[0].itemValue" placeholder="请输入内容"></el-input>
                            </div>

                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[1].isCheck">{{checkedItems[1].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <div style="display: flex;line-height: 40px">
                                <div style="width: 100px"><span>服务频次: </span></div>
                                <el-input v-model="checkedItems[1].itemValue" placeholder="请输入内容"></el-input>
                            </div>

                        </div>
                    </div>
                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[2].isCheck">{{checkedItems[2].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <div style="display: flex;line-height: 40px">
                                <div style="width: 100px"><span>服务频次: </span></div>
                                <el-input v-model="checkedItems[2].itemValue" placeholder="请输入内容"></el-input>
                            </div>

                        </div>
                    </div>
                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[3].isCheck">{{checkedItems[3].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <div style="display: flex;line-height: 40px">
                                <div style="width: 100px"><span>服务频次: </span></div>
                                <el-input v-model="checkedItems[3].itemValue" placeholder="请输入内容"></el-input>
                            </div>

                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[4].isCheck">{{checkedItems[4].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <div style="display: flex;line-height: 40px">
                                <div style="width: 100px"><span>服务频次: </span></div>
                                <el-input v-model="checkedItems[4].itemValue" placeholder="请输入内容"></el-input>
                            </div>

                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[5].isCheck">{{checkedItems[5].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">


                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[6].isCheck">{{checkedItems[6].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">

                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[7].isCheck">{{checkedItems[7].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <el-checkbox v-model="checkedItems[8].isCheck">{{checkedItems[8].itemName}}</el-checkbox>
                        </div>
                    </div>


                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[9].isCheck">{{checkedItems[9].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">
                            <el-checkbox v-model="checkedItems[10].isCheck">{{checkedItems[10].itemName}}</el-checkbox>
                        </div>
                    </div>


                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[11].isCheck">{{checkedItems[11].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class" style="width: 25%;">
                            <el-checkbox v-model="checkedItems[12].isCheck">{{checkedItems[12].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right" style="width: 25%;">
                            <el-checkbox v-model="checkedItems[13].isCheck">{{checkedItems[13].itemName}}</el-checkbox>
                        </div>
                    </div>


                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[14].isCheck">{{checkedItems[14].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">

                        </div>
                    </div>


                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[15].isCheck">{{checkedItems[15].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">

                        </div>
                    </div>

                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[16].isCheck">{{checkedItems[16].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">

                        </div>
                    </div>
                    <div class="tr_reference_class">
                        <div class="td_reference_class">
                            <el-checkbox v-model="checkedItems[17].isCheck">{{checkedItems[17].itemName}}</el-checkbox>
                        </div>
                        <div class="td_reference_class right">

                        </div>
                    </div>
                </div>
            </div>


        </el-form>
        <div class="dialog-footer">
            <el-button @click.native="closeOpt">取消</el-button>
            <el-button type="primary" @click.native="submitOpt">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import global from '@/utils/globalHelper';
    import DataPickerCmm from '@/components/DataPickerCmm';

    export default {
        name: 'serviceFormCmm',
        data() {
            return {
                checkedItems: [
                    {
                        itemId: '100',
                        itemName: '企业安全生产标准咨询',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '101',
                        itemName: '企业安全生产托管',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '102',
                        itemName: '安全生产隐患排查',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '103',
                        itemName: '安全生产教育培训',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '201',
                        itemName: '诊治方案编制与指导',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '202',
                        itemName: '安全生产事故应急预案编制的咨询辅导',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '301',
                        itemName: '职业卫生基础档案辅导',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '302',
                        itemName: '职业病危害预评价',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '303',
                        itemName: '职业病危害控制效果评价',
                        itemValue: '',
                        isCheck: false
                    }
                    ,
                    {
                        itemId: '304',
                        itemName: '职业病危害危害因素现状评价',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '305',
                        itemName: '职业病防护设施设计专篇',
                        itemValue: '',
                        isCheck: false
                    }
                    ,
                    {
                        itemId: '401',
                        itemName: '安全预评价',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '402',
                        itemName: '安全现状评价',
                        itemValue: '',
                        isCheck: false
                    }
                    ,
                    {
                        itemId: '403',
                        itemName: '安全验收评价',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '501',
                        itemName: '危险品经验许可事项待办',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '502',
                        itemName: '成品油经营许可事项待办',
                        itemValue: '',
                        isCheck: false
                    }
                    ,
                    {
                        itemId: '601',
                        itemName: '建设项目安全设施\"三同时\"辅导咨询',
                        itemValue: '',
                        isCheck: false
                    },
                    {
                        itemId: '602',
                        itemName: '建设项目职业卫生\"三同时\"辅导咨询',
                        itemValue: '',
                        isCheck: false
                    }

                ],
                entCompTypeOptions: [
                    {id: 0, name: '主管部门'},
                    {id: 1, name: '乡镇'},
                    {id: 2, name: '企业'}
                ]
            }
        },
        props: {
            editId:{
                type: String,
                default: ''
            },
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
                'contractList', 'managerList'
            ])
        },
        components: {
            DataPickerCmm
        },
        watch:{
            editId:function (value) {
                if(this.editId){
                    this.$store.dispatch('getServiceInfo', {id:this.editId}).then((res) => {
                        this.formData.items=res.items;

                        this.checkedItems.forEach(function(item) {
                            res.items.forEach(function(resItem) {

                                if(item.itemId==resItem.itemId){
                                    item.isCheck=true;
                                    item.itemValue=resItem.itemValue
                                }

                            });

                        });

                    });
                }
            }
        },
        mounted() {
            if(this.editId){
                this.$store.dispatch('getServiceInfo', {id:this.editId}).then((res) => {
                   this.formData.items=res.items;
                    this.checkedItems.forEach(function(item) {
                        res.items.forEach(function(resItem) {
                            if(item.itemId==resItem.itemId){
                                item.isCheck=true;
                                item.itemValue=resItem.itemValue
                            }

                        });

                    });
                });
            }
            this.$store.dispatch('getContractList', {page: 0, rows: 10000});
            this.$store.dispatch('getManagerList', {page: 0, rows: 10000});
        },
        methods: {

            closeOpt: function () {
                if (typeof this.closeSuper == 'function') {
                    this.closeSuper();
                }
            },
            submitOpt() {

                let that=this;
                this.formData.items=[];
                this.checkedItems.forEach(function(item) {
                    if(item.isCheck){
                        that.formData.items.push(item);
                    }
                });

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

<style scoped>

    .dialog-footer {
        position: relative;
        width: 160px;
        margin: 50px auto 0;
        display: flex;
        justify-content: space-between;
    }

    .table_reference_class {
        border-collapse: collapse;
        width: 100%
    }

    .table_reference_class .tr_reference_class {
        height: 40px;
        width: 100%;
        display: flex;
        line-height: 40px;
    }
    .table_reference_class .tr_reference_class .td_reference_class  {
        width: 50%;
        border-left: 1px solid #d4d4d4;
        border-bottom: 1px solid #d4d4d4;
        padding-left: 12px;
        vertical-align: center
    }

    .table_reference_class .tr_reference_class .td_reference_class.right  {
        width: 50%;
        border-right: 1px solid #d4d4d4;
        padding-left: 12px;
        vertical-align: center
    }
</style>
