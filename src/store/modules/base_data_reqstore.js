import types from '../types.js';
import {post, get, dele, put} from '@/utils/serviceHelper.js';

const state = {
    speIndustryList: [],
    speIndustryPage: {page: 1, rows: 10, count: 0},
    riskChemicalList: [],
    riskChemicalPage: {page: 1, rows: 10, count: 0},
    superviseList: [],
    supervisePage: {page: 1, rows: 10, count: 0}
}

const getters = {
    speIndustryList(state) {
        return state.speIndustryList;
    },
    speIndustryPage(state) {
        return state.speIndustryPage;
    },
    riskChemicalList(state) {
        return state.riskChemicalList;
    },
    riskChemicalPage(state) {
        return state.riskChemicalPage;
    },
    superviseList(state) {
        return state.superviseList;
    },
    supervisePage(state) {
        return state.supervisePage;
    }
}

const actions = {
    getSpeIndustryList({commit, state}, param) {
        get('/sys/speIndustry', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.SPEINDUSTRY_LIST_LIST, res);
            }
        })
    },
    speIndustryPageChange({commit, state, dispatch}, param) {
        commit(types.SPEINDUSTRY_LIST_PAGE, param.page);
        dispatch('getSpeIndustryList', param);
    },


    getRiskChemicalList({commit, state}, param) {
        get('/sys/riskChemical', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.RISKCHEMICAL_LIST_LIST, res);
            }
        })
    },
    riskChemicalPageChange({commit, state, dispatch}, param) {
        commit(types.RISKCHEMICAL_LIST_PAGE, param.page);
        dispatch('getRiskChemicalList', param);
    },


    getSuperviseList({commit, state}, param) {
        get('/sys/supervise', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.SUPERVISE_LIST_LIST, res);
            }
        })
    },
    supervisePageChange({commit, state, dispatch}, param) {
        commit(types.SUPERVISE_LIST_PAGE, param.page);
        dispatch('getSuperviseList', param);
    },

    addSpeIndustry({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/sys/speIndustry', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editSpeIndustry({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/speIndustry', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteSpeIndustry({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/sys/speIndustry/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }




    ,

    addSupervise({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/sys/supervise', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editSupervise({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/supervise', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteSupervise({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/sys/supervise/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }



    ,

    addRiskChemical({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/sys/riskChemical', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editRiskChemical({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/riskChemical', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteRiskChemical({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/sys/riskChemical/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }
}
const mutations = {
    [types.SPEINDUSTRY_LIST_LIST](state, data) {
        state.speIndustryList = data.rs;
        state.speIndustryPage.count = data.count;
    },
    [types.SPEINDUSTRY_LIST_PAGE](state, data) {
        state.speIndustryPage.page = data;
    },
    [types.RISKCHEMICAL_LIST_LIST](state, data) {
        state.riskChemicalList = data.rs;
        state.riskChemicalPage.count = data.count;
    },
    [types.RISKCHEMICAL_LIST_PAGE](state, data) {
        state.riskChemicalPage.page = data;
    },
    [types.SUPERVISE_LIST_LIST](state, data) {
        state.superviseList = data.rs;
        state.supervisePage.count = data.count;
    },
    [types.SUPERVISE_LIST_PAGE](state, data) {
        state.supervisePage.page = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
