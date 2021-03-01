import {Loading} from 'element-ui';

let loadingInstance;
// 声明一个对象用于存储请求个数
var globalLoadingRequestCount = 0;

function startLoading() {
    loadingInstance = Loading.service({
        lock: true,
        text: '数据加载中,请稍等',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

var GlobalLoading = {

    showGlobalLoading: () => {
        if (globalLoadingRequestCount === 0) {
            startLoading();
        }
        globalLoadingRequestCount++;
    },

    hideGlobalLoading: () => {
        if (globalLoadingRequestCount <= 0) return;
        globalLoadingRequestCount--;
        if (globalLoadingRequestCount === 0) {
            loadingInstance.close();
        }
    }
}

export default GlobalLoading
