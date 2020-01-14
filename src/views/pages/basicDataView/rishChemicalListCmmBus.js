import {mapGetters} from 'vuex';

export default {
    name: 'rishChemicalListCmm',
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
            'riskChemicalList',
            'riskChemicalPage'
        ])
    },
    components: {
    },
    mounted() {
        this.$store.dispatch('getRiskChemicalList');
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.dispatch('riskChemicalPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('riskChemicalPageChange', 1);
            this.$store.dispatch('getRiskChemicalList', this.filters);
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
                    this.$store.dispatch('deleteRiskChemical', {id: row.id}).then((res) => {
                        this.$store.dispatch('getRiskChemicalList');
                    });
                });
            }
        },
        addFormSubmit: function () {
            this.$store.dispatch('addRiskChemical', this.addForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '创建危险品目录成功'
                });
                this.$store.dispatch('getRiskChemicalList');
                this.addFormVisible = false;
            });
        },
        editFormSubmit:function(){
            this.$store.dispatch('editRiskChemical', this.editForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '修改危险品目录成功'
                });
                this.$store.dispatch('getRiskChemicalList');
                this.editFormVisible = false;
            });
        },
    }
}
