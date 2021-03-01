import Axios from "axios";
import service from "./service";
import api from './api'
import baseUrl from "../config";
import {getToken} from "../storage/tokenStorage";
import download from "../utils/down-from-fdfs";

let commonService = {};
commonService.post = function (method, data) {
    return new Promise(function (resolve, reject) {
        service.post(method, data).then(
            (res) => {
                resolve(res);
            }
        ).catch((error) => {
            reject(error);
        })
    })
}

commonService.upload = function (file, ext, attributes) {
    let fd = new FormData();
    fd.append('file', file);//传文件
    fd.append('ext', ext);
    fd.append("attributes", JSON.stringify(attributes));
    return Axios({
        method: 'post',
        baseURL: baseUrl.baseUrl() + api.public,
        url: "uploadFileToFdfs",
        data: fd,
        headers: {
            'authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        return res.data;
    })
}

commonService.getTokenUrl = function (url) {
    //请求后台计算下载地址秘钥及时间戳
    service.get(api.public + "getTokenUrl", {
        params: {url: url}
    }).then(function (response) {
        console.log(response.data.token_url);
        return response.data.token_url;
    })

}

commonService.downloadFromFdfs = function (data) {
    console.log(data.name);
    //请求后台计算下载地址秘钥及时间戳
    Axios({
        method: 'get',
        baseURL:baseUrl.baseUrl() + api.public ,
        //url: "uploadFileToFdfs?url="+data.url+"&fileName="+data.name,
        url:"downLoadFileFromFdfs",
        params:{url:data.url,fileName:data.name},
        headers: {
            'authorization': getToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'blob'
    }).then(function (response) {
        //请求应用服务器提供流下载
        console.log("2222222222222222");
        console.log(response);
        download.downFromFdfs(response.data,data.name);
    })
}


commonService.downloadFromFdfs4GroupName = function (apiGroupName ,data) {
    console.log(data.name);
    //请求后台计算下载地址秘钥及时间戳
    Axios({
        method: 'get',
        baseURL:baseUrl.baseUrl() + apiGroupName,
        //url: "uploadFileToFdfs?url="+data.url+"&fileName="+data.name,
        url:data.url,
        params:{url:data.url,fileName:data.name},
        headers: {
            'authorization': getToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'blob'
    }).then(function (response) {
        //请求应用服务器提供流下载
        console.log("2222222222222222");
        console.log(response);
        download.downFromFdfs(response.data,data.name);
    })
}

commonService.viewImageFromFdfs = function (url) {
    //请求后台计算下载地址秘钥及时间戳
    Axios({
        method: 'get',
        baseURL:baseUrl.baseUrl() + api.public ,
        //url: "uploadFileToFdfs?url="+data.url+"&fileName="+data.name,
        url:"viewImageFromFdfs",
        params:{url:url},
        headers: {
            'authorization': getToken(),
            //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'blob'
    }).then(function (response) {
        //请求应用服务器提供流下载
        console.log("333333333333");
        console.log(response);
        console.log(window.URL.createObjectURL(response.data));
       return window.URL.createObjectURL(response.data);
    })
}

commonService.downloadFromNg = function (data) {
        let nginx="http://192.168.2.221:8888/group1/";
    download.downFromNg(nginx+data.url, data.name);

}

export default commonService;

