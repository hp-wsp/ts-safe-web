import {mapGetters} from 'vuex';
import companyFormCmm from './companyFormCmm';

export default {
    name: 'companyListCmm',
    data() {
        return {
            filters: {
                id: '',
                name: '',
                nousage: '',
                sex: ''
            },
            checked:false,
            editForm: {},
            editFormVisible: false
        }
    },

    computed: {
        ...mapGetters([
            'companyList',
            'companyPage'
        ])
    },
    components: {
        companyFormCmm
    },
    mounted() {
        this.$store.dispatch('getCompanyList');
    },
    methods: {
        handleDrawerClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        handleCurrentChange(val) {
            this.$store.dispatch('companyPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('companyPageChange', 1);
            this.$store.dispatch('getCompanyList', this.filters);
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteCompany', {id: row.id}).then((res) => {
                        this.$store.dispatch('getCompanyList');
                    });
                });
            }
        },
        editSubmit(requestData) {
            this.$store.dispatch('editCompany', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '企业修改成功'
                });
                this.$store.dispatch('getCompanyList');
                this.editFormVisible = false;
            });
        }
    }
}
