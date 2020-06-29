class Api {
	constructor(app) {
		this.$app = app
		this.$request = app.$request

		const files = require.context('.', true, /\.js$/)
		files.keys().forEach(v => {
			if (v === './index.js' || v === './base.js') return
			let key = v.match(/\.\/(.*)\.js/)[1].split('/')
			key = key.filter((v, k) => k === 0 || v !== 'index').map(v => v.replace(v[0], v[0].toUpperCase())).join('')
			const item = files(v).default
			this[key] = new item(this)
		})
	}

	commit(func_name, ...vars) {
		let page = getCurrentPages()[0].route.replace('pages/', '').split('/')
		page = page.filter((v, k) => k === 0 || v !== 'index').map(v => v.replace(v[0], v[0].toUpperCase())).join('')
		return this[page][func_name](...vars)
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
