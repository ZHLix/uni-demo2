import Fly from 'flyio/dist/npm/fly'
import EngineWrapper from 'flyio/dist/npm/engine-wrapper'
import adapter from './adapter/mp'

const MpEngine = EngineWrapper(adapter)
const fly = new Fly(MpEngine)


class Request {
	constructor(app) {
		this.$origin = Request;
		this.$fly = fly // new Fly()
		this.$app = app
	}

	/**
	 * flyio 设置
	 * @param {Object} config
	 */
	setConfig(config) {
		this.$fly.config = Object.assign({}, this.$fly.config, config)
	}

	/**
	 * flyio 拦截器
	 */
	setInterceptors(name = 'request', success = null, err = null) {
		this.$fly.interceptors[name].use(success, err)
	}

	http(url, method, params, options) {
		return this.$fly[method](url, params, options)
	}

	get(url, params, options) {
		return this.http(url, 'get', params, options)
	}

	post(url, params, options) {
		return this.http(url, 'post', params, options)
	}

	delete(url, params, options) {
		return this.http(url, 'delete', params, options)
	}

	put(url, params, options) {
		return this.http(url, 'put', params, options)
	}


}

const install = (Vue, vm) => {
	Object.defineProperty(Vue.prototype, '$request', {
		get: () => new Request(vm)
	})
}
export {Request}

export default {
	install
}