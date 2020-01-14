<template>
    <div style="padding: 12px">
        <el-form :model="formData" label-width="120px" ref="formData">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="单位名称：" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入单位名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法人：" prop="contact">
                        <el-input v-model="formData.contact" placeholder="请输入法人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话：" prop="phone" :rules="[{ type: 'number', message: '联系电话必须为数字值'}]">
                        <el-input type="phone" autocomplete="off" v-model.number="formData.phone"
                                  placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="省份：" prop="province">
                        <el-input v-model="formData.province" placeholder="请输入省份"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="城市：" prop="city">
                        <el-input v-model="formData.city" placeholder="请输入城市"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址：" prop="address">
                        <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="注册地址：" prop="regAddress">
                <el-input v-model="formData.regAddress"  placeholder="请输入注册地址"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：" prop="busScope">
                <el-input v-model="formData.busScope" type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入经营范围"></el-input>
            </el-form-item>

            <el-card class="box-card" style="margin-left: 36px" v-if="!formData.id">
                <div slot="header" class="clearfix">
                    <span>管理员账号密码</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="管理员用户名：" prop="manUsername">
                            <el-input v-model="formData.manUsername" placeholder="请输入管理员用户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理员密码：" prop="manPassword">
                            <el-input v-model="formData.manPassword" placeholder="请输入管理员密码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>


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

    export default {
        name: 'channelFormCmm',
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
            ...mapGetters([])
        },
        components: {},
        methods: {
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
