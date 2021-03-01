import Mock from 'mockjs';
import cusMenu from "./cusMenu";
import envConfig from "../config";
import api from "../api/api"

//开启mock时，自动拦截请求
export default function () {
    console.log("wwwwwwwwwww");
    if (!envConfig.useMock) return
    Mock.mock(envConfig.baseUrl() + api.user + cusMenu.path, cusMenu.method, cusMenu.data());
}