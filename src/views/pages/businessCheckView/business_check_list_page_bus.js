import {mapGetters} from 'vuex';
import checkTaskFormCmm from './checkTaskFormCmm';
import checkTaskListCmm from './checkTaskListCmm';

export default {
    data() {
        return {
            wmenu: 'checkTaskMenu',
            filters: {
                id: '',
                name: '',
                nousage: '',
                sex: ''
            },
            optName: '新增检查任务',
            addCheckTaskForm: {},
            addCheckTaskFormVisible: false,
        }
    },
    computed: {
        ...mapGetters([])
    },
    watch: {},
    components: {
        checkTaskFormCmm, checkTaskListCmm
    },
    mounted() {
        this.$store.dispatch('getCheckTaskList');
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
        gotoMenu: function (menuType) {
            this.wmenu = menuType;

            if (this.wmenu == 'checkTaskMenu') {
                this.$store.dispatch('getCheckTaskList');
                this.optName = '新增检查任务'
            } else if (this.wmenu == 'contractMenu') {
                this.$store.dispatch('getContractList');
                this.optName = '新增合同'
            } else if (this.wmenu == 'serviceMenu') {
                this.$store.dispatch('getServiceList');
                this.optName = '新增服务'
            }
        },

        tableOperate() {
            if (this.wmenu == 'checkTaskMenu') {
                this.addCheckTaskFormVisible = true;
            } else if (this.wmenu == 'contractMenu') {
                this.addContractFormVisible = true;
            } else if (this.wmenu == 'serviceMenu') {

            }
        },
        addCheckTaskFormSubmit: function (requestData) {
            this.$store.dispatch('addCheckTask', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '新增检查任务成功'
                });
                this.$store.dispatch('getCheckTaskList');
                this.addCheckTaskFormVisible = false;
            });
        }
    }
}
