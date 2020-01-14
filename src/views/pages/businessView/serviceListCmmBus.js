import {mapGetters} from 'vuex';
import serviceFormCmm from './serviceFormCmm';

export default {
    name: 'serviceListCmm',
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
            editId:'',
            editFormVisible: false
        }
    },

    computed: {
        ...mapGetters([
            'serviceList',
            'servicePage',
            'contractList',
            'managerList'
        ])
    },
    components: {
        serviceFormCmm
    },
    mounted() {
        this.$store.dispatch('getServiceList');
        this.$store.dispatch('getContractList', {page: 0, rows: 10000});
        this.$store.dispatch('getManagerList', {page: 0, rows: 10000});
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
            this.$store.dispatch('serviePageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('serviePageChange', 1);
            this.$store.dispatch('getServiceList', this.filters);
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editId=row.id;
                this.editFormVisible = true;
            } else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteService', {id: row.id}).then((res) => {
                        this.$store.dispatch('getServiceList');
                    });
                });
            }
        },
        editSubmit(requestData) {
            this.$store.dispatch('editService', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '服务修改成功'
                });
                this.$store.dispatch('getServiceList');
                this.editFormVisible = false;
            });
        }
    }
}
