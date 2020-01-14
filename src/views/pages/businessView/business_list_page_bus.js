import {mapGetters} from 'vuex';
import companyFormCmm from './companyFormCmm';
import companyListCmm from './companyListCmm';
import contractListCmm from './contractListCmm';
import contractFormCmm from './contractFormCmm';
import serviceListCmm from './serviceListCmm';
import serviceFormCmm from './serviceFormCmm';
export default {
    data() {
        return {
            wmenu: 'companyMenu',
            filters: {
                id: '',
                name: '',
                nousage: '',
                sex: ''
            },
            optName: '新增企业',
            addCompanyForm: {},
            addCompanyFormVisible: false,
            addContractForm: {},
            addContractFormVisible: false,
            addServiceForm: {},
            addServiceFormVisible: false,
        }
    },
    computed: {
        ...mapGetters([])
    },
    watch: {},
    components: {
        companyFormCmm, companyListCmm, contractListCmm,contractFormCmm, serviceListCmm,serviceFormCmm
    },
    mounted() {
        this.$store.dispatch('getServiceList');
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

            if (this.wmenu == 'companyMenu') {
                this.$store.dispatch('getCompanyList');
                this.optName = '新增企业'
            } else if (this.wmenu == 'contractMenu') {
                this.$store.dispatch('getContractList');
                this.optName = '新增合同'
            } else if (this.wmenu == 'serviceMenu') {
                this.$store.dispatch('getServiceList');
                this.optName = '新增服务'
            }
        },

        tableOperate() {
            if (this.wmenu == 'companyMenu') {
                this.addCompanyFormVisible = true;
            } else if (this.wmenu == 'contractMenu') {
                this.addContractFormVisible = true;
            } else if (this.wmenu == 'serviceMenu') {
                this.addServiceFormVisible = true;

            }
        },
        addCompanyFormSubmit: function (requestData) {
            this.$store.dispatch('addCompany', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '新增企业成功'
                });
                this.$store.dispatch('getCompanyList');
                this.addCompanyFormVisible = false;
            });
        },
        addContractFormSubmit: function (requestData) {
            this.$store.dispatch('addContract', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '新增合同成功'
                });
                this.$store.dispatch('getContractList');
                this.addContractFormVisible = false;
            });
        },
        addServiceFormSubmit: function (requestData) {
            this.$store.dispatch('addService', requestData).then((res) => {
                this.$message({
                    type: 'success',
                    message: '新增服务成功'
                });
                this.$store.dispatch('getServiceList');
                this.addServiceFormVisible = false;
            });
        }
    }
}
