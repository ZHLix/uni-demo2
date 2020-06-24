class Api {
	constructor(app) {
		this.$app = app
		this.$request = app.$request
	}
}

const install = (Vue, vm) => {
	Object.defineProperty(Vue.prototype, '$api', {
		get: () => new Api(vm)
	})
}

export default {
	install
}
