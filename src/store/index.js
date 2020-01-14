import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}
const getters = {}
const actions = {}
const mutations = {}

import common_reqstore from './modules/common_reqstore'
import district_reqstore from './modules/district_reqstore'
import login_reqstore from './modules/login_reqstore'
import business_reqstore from './modules/business_reqstore'
import channel_reqstore from './modules/channel_reqstore'
import manager_reqstore from './modules/manager_reqstore'
import base_data_reqstore from './modules/base_data_reqstore'
import business_check_reqstore from './modules/business_check_reqstore'

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        common_reqstore,
        district_reqstore,
        login_reqstore,
        business_reqstore,
        channel_reqstore,
        manager_reqstore,
        base_data_reqstore,
        business_check_reqstore
    }
})
