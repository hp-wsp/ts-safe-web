import {mapGetters} from 'vuex';

export default {
    name: 'superviseListCmm',
    data() {
        return {
            filters: {
                id: '',
                name: '',
                nousage: '',
                sex: ''
            },
            addForm:{},
            addFormVisible: false,
            editForm: {},
            editFormVisible: false
        }
    },

    computed: {
        ...mapGetters([
            'superviseList',
            'supervisePage'
        ])
    },
    components: {
    },
    mounted() {
        this.$store.dispatch('getSuperviseList');
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.dispatch('supervisePageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('supervisePageChange', 1);
            this.$store.dispatch('getSuperviseList', this.filters);
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'add') {
                this.addForm = {};
                this.addFormVisible = true;
            } else if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteSupervise', {id: row.id}).then((res) => {
                        this.$store.dispatch('getSuperviseList');
                    });
                });
            }
        },
        addFormSubmit: function () {
            this.$store.dispatch('addSupervise', this.addForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '创建特种行业成功'
                });
                this.$store.dispatch('getSuperviseList');
                this.addFormVisible = false;
            });
        },
        editFormSubmit:function(){
            this.$store.dispatch('editSupervise', this.editForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '修改特种行业成功'
                });
                this.$store.dispatch('getSuperviseList');
                this.editFormVisible = false;
            });
        },
    }
}
