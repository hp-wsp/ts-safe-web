<template>
    <div class="login_page_class">

        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">

                <div style="width: 70%">
                    <img src="@/assets/img/login_bg.png" style="width: 100%">
                </div>

                <div style="width: 30%;background: #fff;text-align: center;display: flex;">
                    <div style="margin: auto;width: 100%">
                        <div style="color: #000;font-size: 28px">欢迎登陆</div>

                        <div style="height: 3px;width: 60px;background: #3a8ee6;margin: 12px auto;"></div>

                        <el-form :model="loginForm" :rules="rules" ref="loginForm" style="padding: 50px">
                            <el-form-item prop="username">
                                <el-input prefix-icon="iconfont icon-zhanghaodenglu" v-model="loginForm.username"
                                          placeholder="请输入用户名">
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="password" v-if="passwordVisible " onpaste="return false;"
                                          style="margin-bottom:12px !important;">
                                <el-input prefix-icon="iconfont icon-mima"
                                          type="password" placeholder="请输入密码"
                                          @keyup.enter.native="submitForm"
                                          v-model="loginForm.password">
                                    <i slot="suffix" title="显示密码" @click="handleChangePasswordVisible('show')"
                                       style="cursor:pointer;"
                                       class="iconfont icon-xianshimima"></i>

                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password" v-if="!passwordVisible" onpaste="return false;"
                                          style="margin-bottom:12px !important;">
                                <el-input prefix-icon="iconfont icon-mima" type="text"
                                          placeholder="请输入密码"
                                          @keyup.enter.native="submitForm"
                                          v-model="loginForm.password">
                                    <i slot="suffix" title="隐藏密码" @click="handleChangePasswordVisible('hide')"
                                       style="cursor:pointer;"
                                       class="iconfont icon-yincangmima"></i>

                                </el-input>
                            </el-form-item>
                            <el-row :gutter="20" style="display: none" v-if="codeKeyImg!=''">
                                <el-col :span="9">
                                    <div class="grid-content bg-purple">
                                        <el-form-item prop="code">
                                            <el-input prefix-icon="el-icon-picture-outline-round"
                                                      style="font-size: 18px"
                                                      v-model="loginForm.code"
                                                      placeholder="请输入验证码">
                                            </el-input>

                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="grid-content bg-purple"
                                         style="display: flex;justify-content: space-between;height: 40px;line-height: 40px;">
                                        <img :src="codeKeyImg" style="width: auto;height: 100%"></img>
                                        <div style="font-size: 14px;color: #333333;cursor: pointer" @click="getKeyCode">
                                            看不清？<span
                                                style="color: #20a0ff">换一张</span></div>
                                    </div>
                                </el-col>
                            </el-row>


                            <el-form-item style="margin-top: 24px">

                                <el-button type="primary" style="width: 100%" @click="submitForm('loginForm')"
                                           class="submit_btn">登陆
                                </el-button>

                                <div style="text-align: left;font-weight: bold;cursor: pointer;margin-top: 8px"
                                     @click="forgetPasswordOpt()">忘记密码？
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>

            </section>

        </transition>
        <div style="text-align: center;margin-top: 240px;margin-left: 30px;">

        </div>
    </div>
</template>
<script>
    import globalHelper from '../utils/globalHelper';
    import storageHelper from '../utils/storageHelper';

    export default {
        name: 'Login',
        data() {
            return {
                passwordVisible: true,
                codeKeyImg: '',
                loginForm: {
                    username: 'testAdmin',
                    password: '12345678',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                showLogin: false,
            }
        },
        mounted() {
            this.showLogin = true;
            let mLogin = storageHelper.get('userLoginInput');
            if (mLogin) {
                //this.loginForm.aname = mLogin.aname;
                //this.loginForm.password = mLogin.password;
                // {"aname":"admin123","password":"123456"}
            }

        },
        methods: {
            handleChangePasswordVisible: function (value) {
                this.passwordVisible = !(value === 'show');
            },
            forgetPasswordOpt: function () {
                let that = this;
                that.$prompt('请输入账号', '找回密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    this.$store.dispatch('forgetPasswordReq', {username: value}).then((res) => {
                                this.$confirm('请查收短息', '提示', {
                                confirmButtonText: '确定',
                                type: 'success',
                                showCancelButton: false,
                                center: true
                            })
                        });

                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            submitForm() {
                let self = this;
                storageHelper.set('userLoginInput', this.loginForm);

                globalHelper.formValidate(self, 'loginForm').then((valid) => {
                    if (valid) {
                        self.$store.dispatch('loginSen', Object.assign({}, this.loginForm)).then((res) => {

                            this.$router.push('/home')

                        });
                    }
                })
            }
        }
    }

</script>

<style lang="less" scoped>

    .login_page_class {
        position: absolute;
        width: 100%;
        display: flex;
        height: 100%;
        background-image: url(../assets/img/login_bg_test.png);
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
    }


    .login_page_class .form_contianer {
        width: 85%;
        margin: auto auto;
        display: flex;
    }
</style>
