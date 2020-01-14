import types from '../types.js';
import {post,get,dele,put} from '@/utils/serviceHelper.js';
const state = {
    provinceOptions: [],
    cityOptions: [],
    cityId: '',
    countyOptions: [],
    countyId: '',
}

const getters = {
    provinceOptions(state) {
        return state.provinceOptions;
    },
    cityOptions(state) {
        return state.cityOptions;
    },
    countyOptions(state) {
        return state.countyOptions;
    },
    cityId(state) {
        return state.cityId;
    },
    countyId(state) {
        return state.countyId;
    }
}

const actions={
    getCommonDistrict({commit, state}, param) {
        if (param.districtType == 'city' && state.cityId == param.id) {
            return;
        } else if (param.districtType == 'county' && state.countyId == param.id) {
            return;
        }
        get('/comm/district', param).then((res) => {
            if (res.code == 0) {
                if (param.districtType == 'province') {
                    commit(types.DISTRICT_PROVINCE, res.rs);
                } else if (param.districtType == 'city') {
                    commit(types.DISTRICT_CITY, res.rs);
                    commit(types.DISTRICT_CITY_ID, param.id);
                } else if (param.districtType == 'county') {
                    commit(types.DISTRICT_COUNTY, res.rs);
                    commit(types.DISTRICT_COUNTY_ID, param.id);
                }
            }
        })
    }

}
const mutations={
    [types.DISTRICT_PROVINCE](state, data) {
        state.provinceOptions = data;
    },
    [types.DISTRICT_CITY](state, data) {
        state.cityOptions = data;
    },
    [types.DISTRICT_COUNTY](state, data) {
        state.countyOptions = data;
    },
    [types.DISTRICT_CITY_ID](state, data) {
        state.cityId = data;
    },
    [types.DISTRICT_COUNTY_ID](state, data) {
        state.countyId = data;
    }
}

export default {
	state,
	getters,
	actions,
	mutations
}
