import types from '../types.js';
import {post, get, dele, put} from '@/utils/serviceHelper.js';

const state = {
    companyList: [],
    companyPage: {page: 1, rows: 10, count: 0},
    contractList: [],
    contractPage: {page: 1, rows: 10, count: 0},
    serviceList: [],
    servicePage: {page: 1, rows: 10, count: 0},
    superviseList: [],
}

const getters = {
    companyList(state) {
        return state.companyList;
    },
    companyPage(state) {
        return state.companyPage;
    },
    contractList(state) {
        return state.contractList;
    },
    contractPage(state) {
        return state.contractPage;
    },
    serviceList(state) {
        return state.serviceList;
    },
    servicePage(state) {
        return state.servicePage;
    }
}

const actions = {

    getCompanyList({commit, state}, param) {
        get('/man/company', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.COMPANY_LIST_LIST, res);
            }
        })
    },
    companyPageChange({commit, state, dispatch}, param) {
        commit(types.COMPANY_LIST_PAGE, param.page);
        dispatch('getCompanyList', param);
    },

    getContractList({commit, state}, param) {
        get('/man/contract', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.CONTRAST_LIST_LIST, res);
            }
        })
    },
    contractPageChange({commit, state, dispatch}, param) {
        commit(types.CONTRAST_LIST_PAGE, param.page);
        dispatch('getContractList', param);
    },

    getServiceList({commit, state}, param) {
        get('/man/conService', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.SERVICE_LIST_LIST, res);
            }
        })
    },
    serviePageChange({commit, state, dispatch}, param) {
        commit(types.SERVICE_LIST_PAGE, param.page);
        dispatch('getServiceList', param);
    },


    addCompany({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/man/company', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editCompany({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/company', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteCompany({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/man/company/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    getCompanyInfo({commit, state}, param) {
        return new Promise((resolve, reject) => {
            get('/man/company/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
 addContract({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/man/contract', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editContract({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/contract', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteContract({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/man/contract/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }

    , addService({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/man/conService', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editService({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/conService', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteService({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/man/conService/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    getServiceInfo({commit, state}, param) {
        return new Promise((resolve, reject) => {
            get('/man/conService/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
}
const mutations = {
    [types.COMPANY_LIST_LIST](state, data) {
        state.companyList = data.rs;
        state.companyPage.count = data.count;
    },
    [types.COMPANY_LIST_PAGE](state, data) {
        state.companyPage.page = data;
    },
    [types.CONTRAST_LIST_LIST](state, data) {
        state.contractList = data.rs;
        state.contractPage.count = data.count;
    },
    [types.CONTRAST_LIST_PAGE](state, data) {
        state.contractPage.page = data;
    },
    [types.SERVICE_LIST_LIST](state, data) {
        state.serviceList = data.rs;
        state.servicePage.count = data.count;
    },
    [types.SERVICE_LIST_PAGE](state, data) {
        state.servicePage.page = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
