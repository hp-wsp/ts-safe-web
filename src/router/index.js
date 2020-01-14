import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            meta: '登录',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/home',
            name: '',
            component: () => import('@/views/Home.vue'),
            children: [
                {
                    path: '',
                    meta: '',
                    component: () => import('@/views/pages/index_page.vue')
                },
                {
                    path: '/businessList',
                    name:'businessList',
                    meta: '企业信息管理',
                    component: () => import('@/views/pages/businessView/business_list_page.vue')
                },
                {
                    path: '/businessCheckList',
                    name:'businessCheckList',
                    meta: '企业检查管理',
                    component: () => import('@/views/pages/businessCheckView/business_check_list_page.vue')
                },

                {
                    path: '/channelList',
                    name: 'channelList',
                    meta: '服务商管理',
                    component: () => import('@/views/pages/channelView/channel_list_page.vue')
                },
                {
                    path: '/basicDataList',
                    name: 'basicDataList',
                    meta: '基础数据维护',
                    component: () => import('@/views/pages/basicDataView/basic_data_list_page.vue')
                },

                {
                    path: '/managerList',
                    name: 'managerList',
                    meta: '管理员',
                    component: () => import('@/views/pages/managerView/manager_list_page.vue')
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

