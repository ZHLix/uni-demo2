class Utils {
	constructor(app) {
		this.$app = app
	}

	/**
	 * url 参数格式切换
	 */
	urlParams(params) {
		if (!params.params || (params.params && typeof params.params === 'object')) {
			return `params=${JSON.stringify(params)}`
		} else {
			return JSON.parse(params.params)
		}
	}

	/**
	 * url 拼接
	 * @param url
	 * @param params
	 */
	url(url, params = '') {
		if (typeof params === 'object') params = this.urlParams(params)
		return `${url}?${params}`
	}

	/**
	 * 定时器
	 */
	setTimeout(func, s = 0) {
		if (!s) s = parseInt(String(func))
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(func)
			}, s * 1000)
		})
	}
}

const install = (Vue, vm) => {
	Object.defineProperty(Vue.prototype, '$utils', {
		get: () => new Utils(vm)
	})
}

export default {
	install
}
