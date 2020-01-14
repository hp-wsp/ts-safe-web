import {mapGetters} from 'vuex';
import checkTaskFormCmm from './checkTaskFormCmm';

export default {
    name: 'checkTaskListCmm',
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
            'checkTaskList',
            'checkTaskPage'
        ])
    },
    components: {
        checkTaskFormCmm
    },
    mounted() {
        this.$store.dispatch('getCheckTaskList');
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.dispatch('checkTaskPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {

        },
        handleSearch() {
            this.$store.dispatch('checkTaskPageChange', 1);
            this.$store.dispatch('getCheckTaskList', this.filters);
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteCheckTask', {id: row.id}).then((res) => {
                        this.$store.dispatch('getCheckTaskList');
                    });
                });
            }
        },
        editSubmit(requestData) {
            this.$store.dispatch('editCheckTask', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '检查任务修改成功'
                });
                this.$store.dispatch('getCheckTaskList');
                this.editFormVisible = false;
            });
        }
    }
}
