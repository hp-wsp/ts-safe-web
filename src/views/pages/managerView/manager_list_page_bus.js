import {mapGetters} from 'vuex';
import managerFormCmm from './managerFormCmm';

export default {
    data() {
        return {
            wmenu: 'companyMenu',
            checked: false,
            filters: {
                id: '',
                name: '',
                nousage: '',
                sex: ''
            },
            addForm: {},
            addFormVisible: false,
            editForm: {},
            editFormVisible: false
        }
    },
    computed: {
        ...mapGetters([
            'managerList',
            'managerPage'
        ])
    },
    watch: {},
    components: {
        managerFormCmm
    },
    mounted() {
        this.$store.dispatch('getManagerList');
    },
    methods: {
        handleAdd: function () {
            this.addForm = {};
            this.addFormVisible = true;
        },
        addFormSubmit: function (requestData) {
            requestData.roles=["ROLE_SYS"];
            this.$store.dispatch('addManager', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '创建管理员成功'
                });
                this.$store.dispatch('getManagerList');
                this.addFormVisible = false;
            });
        },
        editFormSubmit:function(requestData){
            this.$store.dispatch('editManager', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '修改管理员成功'
                });
                this.$store.dispatch('getManagerList');
                this.editFormVisible = false;
            });
        },
        handleDrawerClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        handleSearch: function () {
        },
        handleCurrentChange(val) {
            this.$store.dispatch('managerPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        scarchData() {
            this.$store.dispatch('managerPageChange', 1);
            this.$store.dispatch('getManagerList', this.filters);
        },
        tableOperate(typeOpt, row) {
            console.log(row);
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'add') {
                this.addForm = {};
                this.addFormVisible = true;
            }  else if (typeOpt === 'rest') {
                this.$prompt('请输入新密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$store.dispatch('resetPasswordManager', {id: row.id,newPassword:value}).then((res) => {
                        this.$store.dispatch('getManagerList');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteManager', {id: row.id}).then((res) => {
                        this.$store.dispatch('getManagerList');
                    });
                });
            }
        }
    }
}
