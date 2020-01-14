import axios from 'axios';
import qs from 'qs';
import router from '../router/index.js'
import {Loading, Message} from 'element-ui'

let xToken = '';//token
export function setToken(mToken) {
    xToken = 'Bearer ' + mToken;
}


let loading;  //定义loading变量
let needLoadingRequestCount = 0;

function startLoading() {
    if (needLoadingRequestCount === 0) {
        loading = Loading.service({
            lock: true,
            text: '正在努力加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    needLoadingRequestCount++

}

function endLoading() {
    if (needLoadingRequestCount > 0) {
        needLoadingRequestCount--;
    }
    if (needLoadingRequestCount === 0) {
        loading.close();
    }
}

//默认值
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = '';
} else {
    axios.defaults.baseURL = 'http://safe.tuoshecx.com/api';//'http://cloud.tdenergys.com/spm-api';
}
axios.defaults.headers.post['Content-Type'] = 'application/json';//application/x-www-form-urlencoded
axios.defaults.timeout = 60000;
//请求拦截器
axios.interceptors.request.use(
    config => {
        if (config.data instanceof FormData) {
            config.headers = {
                'Content-Type': 'multipart/form-data'
            }
        } else {
            config.data = JSON.stringify(config.data);
            config.headers = {
                'Content-Type': 'application/json'
            }
        }
        if (xToken !== '') {
            config.headers.Authorization = xToken
        }
        startLoading();
        // config.withCredentials = true;
        return config;
    },
    error => {
        Message.error({message: '请求超时!'});
        return Promise.reject(error);
    }
)
//响应拦截器
axios.interceptors.response.use(
    res => {
        endLoading();
        let resData = res.data;
        if (res.status === 200) {
            if (resData.code==0) {
                return resData;
            } else {
                Message.error({message: resData.messages[0]});
                return;
            }
        } else {
            Message.error({message: resData.messages[0]});
            router.push('/');
            return;
        }
    },
    error => {
        if (!error.response) {
            Message.error({message: '您的网络断掉了!'});
        }
        if (error.response.status == 504 || error.response.status == 404) {
            Message.error({message: '安全验证过期，请重新登陆!'});
        } else if (error.response.status == 403) {
            Message.error({message: '安全验证过期，请重新登陆!'});
            router.push('/')
        } else {
            Message.error({message: '发生错误!!'});
        }
        endLoading();
        return Promise.reject(error);
    }
)

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, {indices: false, skipNulls: true});
            }
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function post(url, params = {}) {
    // var form_data = parseFormData(params);
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        )
    })
}

export function dele(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, {indices: false, skipNulls: true})
            }
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function put(url, params = {}) {
    // var form_data = parseFormData(params);
    return new Promise((resolve, reject) => {
        axios.put(url, params).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        )
    })
}

function parseFormData(data) {
    let formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return formData;
};
