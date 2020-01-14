<template>
    <el-container class="home_page_class">

        <el-header>
            <div style="height: 60px;line-height:60px;width: 200px;color: #4c7beb;font-size: 16px;font-weight:bold; display: flex">
                <div style="width: 198px;text-align: center;">安全助手</div>
                <div style="height: 60%;width: 2px;background: #20a0ff;opacity:0.2;margin-top: 12px"></div>
            </div>
            <div style=" display: flex;font-size: 14px;color: #333333;align-items: center;">
                <i class="el-icon-info" style="color: #3190e8;font-size: 28px;margin-right: 8px"></i>
                <div style="color: #666666;margin-right: 8px">当前登录：</div>
                <div style="color: #333333;margin-right: 30px"> 超级管理员<i class="el-icon-caret-bottom"
                                                                        style="color: #333333;font-size: 16px"></i>
                </div>
                <div style="height: 24px ;border-radius: 50px;background: red;padding: 0 12px;line-height: 22px;margin-right: 18px;cursor: pointer"
                     @click="handleExit">
                    <i class="el-icon-switch-button" style="color: #ffffff;font-size: 14px;font-weight: bold"></i>
                    <span style="color: #ffffff;font-size: 12px;margin-left: 5px">退出</span>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu
                        :default-active="activeIndex"
                        background-color="#4c7beb"
                        text-color="#ffffff"
                        active-text-color="#5e8eff"
                        :collapse="isCollapse"
                        router>
                    <el-menu-item index="/home">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/businessList">
                        <i class="el-icon-office-building"></i>
                        <span slot="title">企业信息管理</span>
                    </el-menu-item>
                    <el-menu-item index="/businessCheckList">
                        <i class="el-icon-office-building"></i>
                        <span slot="title">企业检查管理</span>
                    </el-menu-item>
                    <el-menu-item index="/basicDataList">
                        <i class="el-icon-place"></i>
                        <span slot="title">基础数据维护</span>
                    </el-menu-item>
                    <el-menu-item index="/managerList">
                        <i class="el-icon-place"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>


                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <!--编辑界面-->
        <el-dialog
                title="编辑"
                :visible.sync="editFormVisible"
                width="500px"
                :close-on-click-modal="false"
                center
        >
            <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
                <el-form-item label="管理员名字" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号" prop="template">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--修改密码界面-->
        <el-dialog
                title="编辑"
                :visible.sync="editPasswordFormVisible"
                width="500px"
                :close-on-click-modal="false"
                center
        >
            <el-form
                    :model="editPasswordForm"
                    label-width="110px"
                    :rules="editPasswordFormRules"
                    ref="editPasswordForm"
            >
                <el-form-item label="旧密码" prop="password">
                    <el-input v-model="editPasswordForm.password" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="editPasswordForm.newPassword" type="password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click.native="editPasswordFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editPasswordSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import globalHelper from '../utils/globalHelper';

    export default {
        name: "Home",
        data() {
            return {
                activeIndex: "/home",
                isCollapse: false,
                editFormVisible: false, //编辑信息界面数据
                editLoading: false,
                editForm: {
                    name: "",
                    phone: ""
                },
                editFormRules: {
                    name: [
                        {required: true, message: "请输入管理员名字", trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "请输入管理员手机号", trigger: "blur"}
                    ]
                },
                editPasswordFormVisible: false, //编辑密码界面数据
                editPasswordForm: {
                    password: "",
                    newPassword: ""
                },
                editPasswordFormRules: {
                    password: [
                        {required: true, message: "请输入旧密码", trigger: "blur"}
                    ],
                    newPassword: [
                        {required: true, message: "请输入新密码", trigger: "blur"}
                    ]
                }
            };
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'menuList'
            ])
        },
        created() {
            if (this.$route.path) {
                let mPath = this.$route.path.slice(1);
                this.activeIndex = '/' + mPath;
            }

            this.$store.dispatch('getCommonDistrict', {id: 'root', districtType: 'province'});//省份
            this.$store.dispatch('getCheckTypeList', {page: 0, rows: 10000});
        },
        methods: {
            handleLefeMenu() {
                this.isCollapse = !this.isCollapse;
            },
            handleCommand(command) {
                if (command == "commandHome") {
                    this.$router.push('/home');
                } else if (command == "commandAccountEdit") {
                    this.editFormVisible = true;
                    this.editForm.name = this.userInfo.name ? this.userInfo.name : '';
                    this.editForm.phone = this.userInfo.phone ? this.userInfo.phone : '';
                } else if (command == "commandPasswordEdit") {
                    this.editPasswordFormVisible = true;
                } else if (command == "commandlogout") {
                    this.$store.dispatch('loginQuit');
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    });
                    this.$router.push('/');
                }
            },
            handleExit: function () {
                this.$store.dispatch('loginQuit');
                this.$message({
                    type: 'success',
                    message: '退出成功'
                });
                this.$router.push('/');
            },
            editSubmit(e) {
                let self = this;
                globalHelper.formValidate(this, 'editForm').then((valid) => {
                    if (valid) {
                        self.$confirm('确认提交吗？', '提示', {}).then(() => {
                            self.editLoading = true;
                            self.$store.dispatch('updateAccount', Object.assign({}, this.editForm)).then((res) => {
                                self.$message({
                                    type: 'success',
                                    message: '修改信息成功'
                                });

                                self.$refs['editForm'].resetFields();
                                self.editFormVisible = false;
                                self.editLoading = false;
                            }).catch((error) => {
                                self.editLoading = false;
                            })
                        });
                    }
                })
            },
            editPasswordSubmit(e) {
                let self = this;
                globalHelper.formValidate(self, 'editPasswordForm').then((valid) => {
                    if (valid) {
                        self.$confirm('确认提交吗？', '提示', {}).then(() => {
                            self.editLoading = true;
                            self.$store.dispatch('updatePassword', Object.assign({}, this.editPasswordForm)).then((res) => {
                                self.$message({
                                    type: 'success',
                                    message: '修改密码成功'
                                });

                                self.$refs['editPasswordForm'].resetFields();
                                self.editPasswordFormVisible = false;
                                self.editLoading = false;
                            }).catch((error) => {
                                self.editLoading = false;
                            })
                        });
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .home_page_class {
        width: 100%;
        height: 100%;
    }

</style>
