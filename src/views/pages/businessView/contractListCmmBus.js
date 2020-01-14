import {mapGetters} from 'vuex';
import contractFormCmm from './contractFormCmm';

export default {
    name: 'contractListCmm',
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
            'contractList',
            'contractPage'
        ])
    },
    components: {
        contractFormCmm
    },
    mounted() {
        this.$store.dispatch('getContractList');
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
            this.$store.dispatch('contractPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('contractPageChange', 1);
            this.$store.dispatch('getContractList', this.filters);
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteContract', {id: row.id}).then((res) => {
                        this.$store.dispatch('getContractList');
                    });
                });
            }
        },
        editSubmit(requestData) {
            this.$store.dispatch('editContract', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '合同修改成功'
                });
                this.$store.dispatch('getContractList');
                this.editFormVisible = false;
            });
        }
    }
}
