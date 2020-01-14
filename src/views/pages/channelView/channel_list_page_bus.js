import {mapGetters} from 'vuex';
import channelFormCmm from './channelFormCmm';

export default {
    data() {
        return {
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
            'channelList',
            'channelPage'
        ])
    },
    watch: {},
    components: {
        channelFormCmm
    },
    mounted() {
        this.$store.dispatch('getChannelList');
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
        handleSearch: function () {
            this.$store.dispatch('channelPageChange', 1);
            this.$store.dispatch('getChannelList', this.filters);
        },
        handleCurrentChange(val) {
            this.$store.dispatch('channelPageChange', {page: val, ...this.filters});
        },
        handleSizeChange(val) {
            this.$store.dispatch('channelPageChange', {page: val, ...this.filters});
        },
        tableOperate(typeOpt, row) {
            if (typeOpt === 'edit') {
                this.editForm = row;
                this.editFormVisible = true;
            } else if (typeOpt === 'add') {
                this.addForm = {};
                this.addFormVisible = true;
            }  else if (typeOpt === 'open') {
                this.$store.dispatch('openChannel', {id: row.id}).then((res) => {
                    this.$store.dispatch('getChannelList', this.filters);
                });
            } else if (typeOpt === 'close') {
                this.$store.dispatch('closeChannel', {id: row.id}).then((res) => {
                    this.$store.dispatch('getChannelList', this.filters);
                });
            }else if (typeOpt === 'del') {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteChannel', {id: row.id}).then((res) => {
                        this.$store.dispatch('getChannelList');
                    });
                });
            }
        },
        addFormSubmit: function (requestData) {
            this.$store.dispatch('addChannel', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '创建服务商成功'
                });
                this.$store.dispatch('getChannelList');
                this.addFormVisible = false;
            });
        },
        editFormSubmit:function(requestData){
            this.$store.dispatch('editChannel', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '修改服务商成功'
                });
                this.$store.dispatch('getChannelList');
                this.editFormVisible = false;
            });
        },
    }
}
