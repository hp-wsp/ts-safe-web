import {mapGetters} from 'vuex';

export default {
    name: 'speIndustryListCmm',
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
            'speIndustryList',
            'speIndustryPage'
        ])
    },
    components: {
    },
    mounted() {
        this.$store.dispatch('getSpeIndustryList');
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.dispatch('speIndustryPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('speIndustryPageChange', 1);
            this.$store.dispatch('getSpeIndustryList', this.filters);
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
                    this.$store.dispatch('deleteSpeIndustry', {id: row.id}).then((res) => {
                        this.$store.dispatch('getSpeIndustryList');
                    });
                });
            }
        },
        addFormSubmit: function () {
            this.$store.dispatch('addSpeIndustry', this.addForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '创建特种行业成功'
                });
                this.$store.dispatch('getSpeIndustryList');
                this.addFormVisible = false;
            });
        },
        editFormSubmit:function(){
            this.$store.dispatch('editSpeIndustry', this.editForm).then((res) => {
                this.$message({
                    type: 'success',
                    message: '修改特种行业成功'
                });
                this.$store.dispatch('getSpeIndustryList');
                this.editFormVisible = false;
            });
        },
    }
}
