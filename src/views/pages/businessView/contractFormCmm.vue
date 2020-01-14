<template>
    <div style="padding: 12px">
        <el-form :model="formData" label-width="140px" ref="formData">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="合同编号：" prop="num">
                        <el-input v-model="formData.num" placeholder="请输入合同编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="合同名称：" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入合同名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="咨询服务项目：" prop="conProject">
                        <el-input v-model="formData.conProject" placeholder="请输入咨询服务项目"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="委托单位：" prop="entCompName">
                        <el-input v-model="formData.entCompName" placeholder="请输入委托单位"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托单位形式：" prop="entCompType">
                        <el-select v-model="formData.entCompType" placeholder="委托单位形式">
                            <el-option
                                    v-for="item in entCompTypeOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托服务地址：" prop="serAddress">
                        <el-input v-model="formData.serAddress" placeholder="请输入委托服务地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="服务企业：" prop="amount">
            <el-select v-model="formData.serCompId" placeholder="请选择">
                <el-option
                        v-for="item in companyList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="合同总金额：" prop="amount">
                        <el-input v-model="formData.amount"   :min="0" >
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目属地：" prop="proAddress">
                        <el-input v-model="formData.proAddress" placeholder="请输入项目属地"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="合同签订时间：" prop="sigConDate">
                        <el-date-picker
                                v-model="formData.sigConDate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同约定服务周期：" prop="proAddress">

                        <data-picker-cmm :wxStartData.sync="formData.serConDateFrom" :wxEndData.sync="formData.serConDateTo"></data-picker-cmm>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="甲方联系人：" prop="ownPerson">
                        <el-input v-model="formData.ownPerson" placeholder="请输入甲方联系人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="甲方联系方式：" prop="ownPhone">
                        <el-input v-model="formData.ownPhone" placeholder="请输入甲方联系方式"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="我方签单人：" prop="sigPerson">
                        <el-input v-model="formData.sigPerson" placeholder="请输入我方签单人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="我方签署单位：" prop="sigCompany">
                        <el-input v-model="formData.sigCompany" placeholder="请输入我方签署单位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


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
        name: 'contractFormCmm',
        data() {
            return {
                entCompTypeOptions: [
                    {id: 0, name: '主管部门'},
                    {id: 1, name: '乡镇'},
                    {id: 2, name: '企业'}
                ]
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
                'provinceOptions', 'cityOptions', 'countyOptions','companyList'
            ])
        },
        components: {
            DataPickerCmm
        },
        mounted() {
            this.$store.dispatch('getCompanyList', {page:0, rows: 10000});
        },
        methods: {
            //选择省份，获取城市数据
            handleProvinceChange: function (value) {
                this.$store.dispatch('getCommonDistrict', {id: value, districtType: 'city'});//省份
                this.formData.cityId = '';
                // this.formData.countryId='';
            },
            //选择城市，获取区县数据
            handleCityChange: function (value) {
                this.$store.dispatch('getCommonDistrict', {id: value, districtType: 'county'});//省份
                this.formData.countryId = '';

            },
            handleCountyChange: function (value) {
                this.$set(this.formData, this.formData.countryId, value)
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

<style scoped>

    .dialog-footer {
        position: relative;
        width: 160px;
        margin: 50px auto 0;
        display: flex;
        justify-content: space-between;
    }
</style>
