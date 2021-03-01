import service from "./service";
import api from './api'


let _public ={};


_public.post= function (method,data) {
    return new Promise(function(resolve,reject){
        service.post(api.public+method,data).then(
            (res)=>{
                resolve(res);
            }
        ).catch((error)=>{
            reject(error);
        })
    })
}

export default _public