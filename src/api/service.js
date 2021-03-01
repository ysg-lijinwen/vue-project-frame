import axios from 'axios'
import {
    Message
} from 'element-ui'
import router from '../router'
import {
    setToken,
    getToken
} from '../storage/tokenStorage'
import GlobalLoading from "../utils/global-loading";
import baseUrl from "../config";
// 创建axios实例
const service = axios.create({
    timeout: 60000, // 请求超时时间
    withCredentials: true
})

service.defaults.baseURL = baseUrl.baseUrl();

// request拦截器
service.interceptors.request.use(
    config => {
        console.log("into intercept");
        GlobalLoading.showGlobalLoading();

        if (config && config.method == 'get') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        if (config && config.method == 'post') {
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }

        console.log('service.interceptors.request----------------')
        config.headers = {
            'authorization': getToken()
        }
        console.log(config);
        return config
    },
    error => {
        GlobalLoading.hideGlobalLoading();
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        // console.log('service.interceptors.response res=' + JSON.stringify(response.data))
        GlobalLoading.hideGlobalLoading();
        //token 过期，获取刷新后的access-token
        var token = response.headers['authorization'];
        if (token) {
            setToken(token);
        }
        /**
         * code为非00000是抛错
         */
        const res = response.data
        // console.log('service.interceptors.response res code=' + res.code)
        if (res.code !== '000000') {
            Message({
                message: res.message,
                type: 'warning',
                duration: 5 * 1000
            })
            if (res.code === '000008') {
                router.push('/'); //退出登录
                //     MessageBox('你的token已经失效，请重新登录', '重新登录', {
                //    	confirmButtonText: '确定',
                //    	cancelButtonText: '取消',
                //    	type: 'warning'
                //    }).then(() => {
                //    	// request.getSession().setAttribute("session_name", null);//清空Session
                //    	router.push('/'); //退出登录
                //    }).catch(() => {
                //    	//取消操作
                //    });
            }
            return Promise.reject('error')
        } else {
            // console.log('service.interceptors.response return data')
            return response.data
        }
    },
    error => {
        GlobalLoading.hideGlobalLoading();
        console.log('err1111' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service