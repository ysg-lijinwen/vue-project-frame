let menuList = [{
	"hasChildren": false,
	"id": 1,
	"isButton": 1,
	"isMarking": 0,
	"menuIco": "test.png",
	"menuName": "测试页面",
	"menuUri": "test",
	"parentId": 0,
	"sort": 1,
	"status": 0
}, {
	"hasChildren": false,
	"id": 2,
	"isButton": 1,
	"isMarking": 0,
	"menuIco": "test.png",
	"menuName": "发票记录",
	"menuUri": "recordList",
	"parentId": 0,
	"sort": 1,
	"status": 0
},
	// {
	// 	"children": [{
	// 			"children": [{
	// 					"hasChildren": false,
	// 					"id": 22,
	// 					"isButton": 1,
	// 					"isMarking": 0,
	// 					"menuName": "内容管理",
	// 					"menuUri": "/index/main/zggl/zgxxgl/nrgl",
	// 					"parentId": 21,
	// 					"sort": 22,
	// 					"status": 0
	// 				},
	// 			],
	// 			"hasChildren": true,
	// 			"id": 21,
	// 			"isButton": 1,
	// 			"isMarking": 0,
	// 			"menuIco": "test.png",
	// 			"menuName": "政工学习管理",
	// 			"menuUri": "/index/main/zggl/zgxxgl",
	// 			"parentId": 20,
	// 			"sort": 21,
	// 			"status": 0
	// 		},
	// 	],
	// 	"hasChildren": true,
	// 	"id": 20,
	// 	"isButton": 1,
	// 	"isMarking": 0,
	// 	"menuIco": "test.png",
	// 	"menuName": "政工管理",
	// 	"menuUri": "/index/main/zggl",
	// 	"parentId": 0,
	// 	"sort": 20,
	// 	"status": 0
	// },
];
let permButtonList = [{
	"hasChildren": false,
	"id": 103,
	"isButton": 2,
	"isMarking": 0,
	"menuDesc": "按钮",
	"menuIco": "",
	"menuName": "查看详情",
	"menuUri": "/pc/recruit:selectEnrollInfoOnConditions",
	"parentId": 51,
	"sort": 103,
	"status": 0
},
];
const permMenuAndButton = {
	menuList: menuList,
	permButtonList: permButtonList
}

export default {
	method: 'post',
	path: 'getMenuButtonByUser',//getPermMenuAndButtonList   getMenuButtonByUser
	data: () => {
		return {
			code: '000000',
			message: 'success',
			data: permMenuAndButton
		};
	}
}