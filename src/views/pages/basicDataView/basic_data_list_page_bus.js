import {mapGetters} from 'vuex';
import speIndustryListCmm from './speIndustryListCmm';
import superviseListCmm from './superviseListCmm';
import rishChemicalListCmm from './rishChemicalListCmm';

export default {
    data() {
        return {
            wmenu: 'speIndustryMenu',
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
        ...mapGetters([])
    },
    watch: {},
    components: {
        speIndustryListCmm, superviseListCmm, rishChemicalListCmm
    },
    mounted() {

    },
    methods: {
        handleSearch: function () {
        },
        gotoMenu: function (menuType) {
            this.wmenu = menuType;

            if (this.wmenu == 'speIndustryMenu') {
                this.$store.dispatch('getSpeIndustryList');
            } else if (this.wmenu == 'rishChemicalMenu') {
                this.$store.dispatch('getRiskChemicalList');
            } else if (this.wmenu == 'superviseMenu') {
                this.$store.dispatch('getSuperviseList');
            }
        },
    }
}
