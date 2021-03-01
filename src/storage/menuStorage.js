const cacheMenuKey = 'menu.base.carlea.com';

export function getMenuListFromCache() {
    return JSON.parse(sessionStorage.getItem(cacheMenuKey));
}

export function setMenuListCache(menulist) {
    console.log("cache begin"+menulist)
    return sessionStorage.setItem(cacheMenuKey, JSON.stringify(menulist));
}

export function removeCache() {
    sessionStorage.clear();
}

export function setPermButtonCache(list) {
    list.forEach(function (menu) {
		// if(menu.menuUri==='/pc/recruit:addApplyInfos'){
		// 	console.log('我是重复的：'+menu.menuUri)
		// }
        sessionStorage.setItem(menu.menuUri, menu.menuName);
    })
}

export function hasPerm(key) {
    let isHasPerm = false;
	console.log(sessionStorage)
    if (sessionStorage.getItem(key)) {
        isHasPerm = true;
    }
    return isHasPerm;

}
