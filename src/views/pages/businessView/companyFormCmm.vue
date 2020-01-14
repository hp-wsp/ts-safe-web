<template>
    <div style="padding: 12px">
        <el-form :model="formData" label-width="120px" ref="formData">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="企业名称：" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="经营状态：" prop="contact">
                        <el-select v-model="formData.busStatus" placeholder="经营状态">
                            <el-option
                                    v-for="item in busStatusOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="隶属关系：" prop="contact">
                        <el-select v-model="formData.memFun" placeholder="隶属关系">
                            <el-option
                                    v-for="item in memFunOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="社会信用代码：" prop="creditCode">
                        <el-input v-model="formData.creditCode" placeholder="请输入社会信用代码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="企业规模：" prop="contact">
                        <el-select v-model="formData.entScale" placeholder="企业规模">
                            <el-option
                                    v-for="item in entScaleOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="行业主管单位：" prop="indOfCompany">
                        <el-input v-model="formData.indOfCompany" placeholder="请输入行业主管单位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="法定代表人：" prop="legalPerson">
                        <el-input v-model="formData.legalPerson" placeholder="请输入法定代表人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法人电话：" prop="legalPhone">
                        <el-input v-model="formData.legalPhone" placeholder="请输入法人电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法人手机：" prop="legalMobile">
                        <el-input v-model="formData.legalMobile" maxlength="11" placeholder="请输入法人手机"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="安全管理员：" prop="safePerson">
                        <el-input v-model="formData.safePerson" placeholder="请输入安全管理员"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="安全管理员电话：" prop="safePhone">
                        <el-input v-model="formData.safePhone" placeholder="请输入安全管理员电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="安全管理员手机：" prop="safeMobile">
                        <el-input v-model="formData.safeMobile" maxlength="11" placeholder="请输入安全管理员手机"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="联系人：" prop="contact">
                        <el-input v-model="formData.contact" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input v-model="formData.phone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机：" prop="mobile">
                        <el-input v-model="formData.mobile" maxlength="11" placeholder="请输入手机"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="省份：" prop="provinceId">
                        <el-select v-model="formData.provinceId" placeholder="省份" @change="handleProvinceChange">
                            <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="城市：" prop="cityId">

                        <el-select v-model="formData.cityId" placeholder="城市" @change="handleCityChange">
                            <el-option
                                    v-for="item in cityOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="区县：" prop="countryId">
                        <el-select v-model="formData.countryId" placeholder="区县" @change="handleCountyChange">
                            <el-option
                                    v-for="item in countyOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="地址：" prop="address">
                        <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="注册地址：" prop="regAddress">
                <el-input v-model="formData.regAddress" placeholder="请输入注册地址"></el-input>
            </el-form-item>
            <el-form-item label="企业简介：" prop="profile">
                <el-input v-model="formData.profile" type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入企业简介"></el-input>
            </el-form-item>

            <el-form-item label="经营产品：" prop="manProduct">
                <el-input v-model="formData.manProduct" type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入经营产品"></el-input>
            </el-form-item>

            <el-form-item label="图片上传：" prop="manProduct">
                <upload-more-image-cmm :wxImageList.sync="formData.images"></upload-more-image-cmm>
            </el-form-item>


            <el-form-item label="行业分类：" prop="manProduct">
                <div>{{indCtgNames?indCtgNames.join(","):''}}</div>
                <el-cascader-panel
                        v-model="indCtgIdsData"
                        :show-all-levels="false"
                        ref="cascader"
                        filterable
                        style="width: 100%"
                        placeholder="请选择行业分类"
                        @active-item-change="handleGetNodes"
                        @change="handleItemChange"
                        :options="superviseOptions"
                        clearable
                        :props="{checkStrictly:false,multiple: true ,expandTrigger: 'hover' ,value: 'id',label: 'name',children: 'children'}"
                ></el-cascader-panel>
            </el-form-item>

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
    import UploadMoreImageCmm from '@/components/UploadMoreImageCmm';

    export default {
        name: 'companyFormCmm',
        data() {
            return {
                superviseOptions: [],
                indCtgIdsData: [],
                indCtgNames: [],
                entScaleOptions: [
                    {id: 0, name: '大型'},
                    {id: 1, name: '中型'},
                    {id: 2, name: '小型'},
                    {id: 3, name: '微型'}
                ],
                memFunOptions: [
                    {id: 0, name: '央属'},
                    {id: 1, name: '省属'},
                    {id: 2, name: '市属'},
                    {id: 3, name: '县属'},
                    {id: 4, name: '其他'}
                ],
                busStatusOptions: [
                    {id: 0, name: '在营'},
                    {id: 1, name: '转产'},
                    {id: 2, name: '关闭'},
                    {id: 3, name: '停产'}
                ],
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
        watch: {
            formData(value) {
                if (this.cityId != this.formData.provinceId) {
                    this.$store.dispatch('getCommonDistrict', {id: this.formData.provinceId, districtType: 'city'});//省份
                }

                if (this.countyId != this.formData.cityId) {
                    this.$store.dispatch('getCommonDistrict', {id: this.formData.cityId, districtType: 'county'});//省份
                }
            }
        },
        computed: {
            ...mapGetters([
                'provinceOptions', 'cityOptions', 'countyOptions', 'cityId', 'countyId'
            ])
        },
        components: {
            UploadMoreImageCmm
        },
        mounted() {
            this.handleGetNodes();
            if (this.cityId != this.formData.provinceId) {
                this.$store.dispatch('getCommonDistrict', {id: this.formData.provinceId, districtType: 'city'});//省份
            }

            if (this.countyId != this.formData.cityId) {
                this.$store.dispatch('getCommonDistrict', {id: this.formData.cityId, districtType: 'county'});//省份
            }

            if (this.formData.indCtgs.length > 0) {
                this.indCtgIdsData = []
                let that = this;
                this.formData.indCtgs.forEach(function (item) {
                    that.indCtgIdsData.push(item.parentIds.split(','));
                    that.indCtgNames.push(item.name);
                })
            }
        },
        methods: {
            handleGetNodes(val) {

                let idArea
                let sizeArea
                if (!val) {
                    idArea = 'root'
                    sizeArea = 0
                } else if (val.length === 1) {
                    idArea = val[0]
                    sizeArea = val.length // 3:一级 4:二级 6:三级
                } else if (val.length === 2) {
                    idArea = val[1]
                    sizeArea = val.length // 3:一级 4:二级 6:三级
                }

                this.$store.dispatch('getBaseSuperviseChildrenList', {id: idArea}).then((res) => {
                    if (sizeArea === 0) {
                        this.superviseOptions = res.map((value, i) => {
                            return {
                                id: value.id,
                                name: value.name,
                                children: []
                            }
                        })
                    } else if (sizeArea === 1) {
                        this.superviseOptions.map((value, i) => {
                            if (value.id === val[0]) {
                                if (!value.children.length) {
                                    value.children = res.map((value, i) => {
                                        return {
                                            id: value.id,
                                            name: value.name,
                                            children: []
                                        }
                                    })
                                }
                            }
                        })
                    } else if (sizeArea === 2) {
                        this.superviseOptions.map((value, i) => {
                            if (value.id === val[0]) {
                                value.children.map((value, i) => {
                                    if (value.id === val[1]) {
                                        if (!value.children.length) {
                                            value.children = res.map((value, i) => {
                                                return {
                                                    id: value.id,
                                                    name: value.name
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }

                });

            },
            handleItemChange(val) {
                this.formData.indCtgs = [];
                this.indCtgNames = [];
                let selectNodes = this.$refs['cascader'].getCheckedNodes();
                selectNodes.forEach((item, index) => {
                    console.log(item);
                    console.log(this.formData.indCtgIdsData);
                    this.formData.indCtgs.push({id: item.data.id, parentIds: this.formData.indCtgIdsData[index] + ''});
                    // this.formData.indCtgIds.push(item.data.id);
                    this.indCtgNames.push(item.data.name);
                })

                // console.log(this.formData.indCtgIds);
                // console.log(this.formData.indCtgIdsData);
            },
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
