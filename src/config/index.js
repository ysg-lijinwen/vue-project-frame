// 这里放工程配置项，也可以用cross-env配入环境变量中，根据不同环境切换
export default {
	useMock: false,
	baseUrl: () => {
		switch (process.env.VUE_APP_ENVIRONMENT) {
			case 'product':
				window['console']['log'] = function() {}; //关闭console.log日志输出
				return 'http://192.168.3.6:8088';
			case 'test':
				return 'http://192.168.3.6:8088';

			case 'development':
				// return 'http://192.168.2.117:9431';//内网测试环境
				// return 'http://114.115.145.80:9431';//内网测试环境
				// return 'http://114.115.213.166:9431';//内网测试环境
				return 'http://192.168.3.6:8088';
		}
	}
}
