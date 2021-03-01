import Vue from 'vue'
import VueRouter from 'vue-router'
//处理Navigating to current location ("xxx") is not allowed
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}

import App from '../App'
import Main from '../views/main/index'
import Login from '../views/login/index'
import Welcome from "../views/main/welcome/welcome"
import Test from "../views/main/test/index"
import RecordList from "../views/main/record/index"

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/index',
		name: 'index',
		component: App, // 这种方式是动态加载，实现按需加载
		redirect: '/index/main',
		children: [{
			name: 'main',
			path: 'main',
			component: Main,
			redirect: '/index/main/welcome',
			children: [{
					path: "welcome",
					name: "welcome",
					component: Welcome
				},
				{
					path: 'test',
					name: 'test',
					component: Test,
				},
				{
					path: 'recordList',
					name: 'recordList',
					component: RecordList,
				},
			]
		}, ]
	},
]

const router = new VueRouter({
	// mode: 'history',//打包要将history注释掉
	base: process.env.BASE_URL,
	routes
})

export default router